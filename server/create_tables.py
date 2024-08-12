import asyncio

from sqlmodel import SQLModel

from app.core.database import async_engine


async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(create_tables())
