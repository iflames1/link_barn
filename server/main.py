import asyncio

from fastapi import FastAPI
from sqlmodel import SQLModel

from app import settings
from app.core.database import async_engine
from app.router.api_v1.endpoints import api_router

app = FastAPI(title=settings.project_name, openapi_url=f"{settings.api_v1_prefix}/openapi.json", debug=settings.debug,
              version=settings.version)
app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/", tags=["status"])
async def health_check():
    return {
        "name": settings.project_name,
        "version": settings.version,
        "description": settings.description
    }


async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


if __name__ == '__main__':
    import uvicorn

    asyncio.run(create_tables())
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)
