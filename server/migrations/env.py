import asyncio
import os
from json import loads
from logging.config import fileConfig
from urllib.parse import urlparse, parse_qs

from alembic import context
from dotenv import load_dotenv
from sqlalchemy import engine_from_config, pool
from sqlalchemy.ext.asyncio import AsyncEngine

import sys
from pathlib import Path

from app.users.models import *
from app.links.models import *
from app.core.models import *
from app.transactions.models import *
from sqlmodel import SQLModel

sys.path.append(str(Path(__file__).parent.parent))

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = SQLModel.metadata

target_metadata.naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)"
          "s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

load_dotenv()

exclude_tables = loads(os.getenv("DB_EXCLUDE_TABLES"))


def get_url_without_sslmode(url):
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    sslmode = query.pop('sslmode', None)
    new_query = '&'.join(f"{k}={v[0]}" for k, v in query.items())
    new_url = parsed._replace(query=new_query).geturl()
    return new_url, sslmode[0] if sslmode else None


def filter_db_objects(
        object,  # noqa: indirect usage
        name,
        type_,
        *args,  # noqa: indirect usage
        **kwargs  # noqa: indirect usage
):
    if type_ == "table":
        return name not in exclude_tables

    if type_ == "index" and name.startswith("idx") and name.endswith("geom"):
        return False

    return True


def run_migrations_offline():
    url = os.getenv("DB_ASYNC_CONNECTION_STR")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        include_object=filter_db_objects
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_object=filter_db_objects
        )
        context.run_migrations()


async def run_migrations_online():
    config_section = config.get_section(config.config_ini_section)
    url = os.getenv("DB_ASYNC_CONNECTION_STR")
    url, sslmode = get_url_without_sslmode(url)
    config_section["sqlalchemy.url"] = url

    connect_args = {}
    if sslmode:
        connect_args["ssl"] = True

    connectable = AsyncEngine(
        engine_from_config(
            config_section,
            prefix="sqlalchemy.",
            poolclass=pool.NullPool,
            future=True,
            connect_args=connect_args
        )
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
