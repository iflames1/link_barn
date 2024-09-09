import asyncio

from fastapi import FastAPI
from sqlmodel import SQLModel

from app import settings
from app.core.database import async_engine
from app.router.api_v1.endpoints import api_router
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.links.models import Link
from app.users.models import User


async def create_tables():
    """
    Creates tables if not exists
    """
    from app.links.models import Link
    from app.users.models import User
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield


origins = [
    "http://localhost:3000",
    "https://linkbarn.vercel.app",
    "https://www.linkbarn.tech",
]
app = FastAPI(title=settings.project_name, openapi_url=f"{settings.api_v1_prefix}/openapi.json", debug=settings.debug,
              version=settings.version, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.api_v1_prefix)


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
