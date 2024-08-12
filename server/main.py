from fastapi import FastAPI

from app import settings

#
# async def create_tables():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)
#
#
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     await create_tables()
#     yield
#

app = FastAPI(title=settings.project_name, openapi_url=f"{settings.api_v1_prefix}/openapi.json", debug=settings.debug,
              version=settings.version)


# app.add_route(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# app.include_router(prefix=settings.API_V1_STR)


@app.get("/", tags=["status"])
async def health_check():
    return {
        "name": settings.project_name,
        "version": settings.version,
        "description": settings.description
    }


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)
