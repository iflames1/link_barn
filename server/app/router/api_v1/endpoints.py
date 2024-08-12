from fastapi import APIRouter

from app.links.api import router as links_router

api_router = APIRouter()
include_api = api_router.include_router

routers = [
    (links_router, "links", "links")
]

for router_item in routers:
    router, prefix, tag = router_item
    if tag:
        include_api(router, prefix=f"/{prefix}", tags=[tag])
    else:
        include_api(router, prefix=f"/{prefix}")
