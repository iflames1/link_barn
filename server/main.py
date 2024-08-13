import asyncio

from fastapi import FastAPI
from sqlmodel import SQLModel

from app import settings
from app.core.database import async_engine
from app.links.models import Link
from app.users.models import User
from app.router.api_v1.endpoints import api_router
from contextlib import asynccontextmanager


async def create_tables():
    """
    Creates tables if not exists
    """
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield


app = FastAPI(title=settings.project_name, openapi_url=f"{settings.api_v1_prefix}/openapi.json", debug=settings.debug,
              version=settings.version, lifespan=lifespan)
app.include_router(api_router, prefix=settings.api_v1_prefix)


# BE USER
# 4588c991-f556-4c04-9a0b-c857e6d11640

@app.get("/", tags=["status"])
async def health_check():
    return {
        "name": settings.project_name,
        "version": settings.version,
        "description": settings.description
    }


if __name__ == '__main__':
    import uvicorn

    asyncio.run(create_tables())
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)
