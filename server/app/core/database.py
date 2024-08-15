from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.pool import NullPool
from app import settings

async_engine = create_async_engine(
    settings.db_async_connection_str,
    echo=True,
    future=True,
    # pool_pre_ping=True,
    # pool_recycle=3600,
    poolclass=NullPool
)

AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_async_session():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
