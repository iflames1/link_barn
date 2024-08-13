from fastapi import APIRouter, status as http_status, Depends
from app.links.crud import LinksCRUD
from app.links.deps import get_links_crud
from app.links.models import LinkRead, LinkCreate
from typing import List

router = APIRouter()


@router.post("", response_model=LinkRead, status_code=http_status.HTTP_201_CREATED)
async def create_link(data: LinkCreate, links: LinksCRUD = Depends(get_links_crud)):
    link = await links.create(data=data)

    return link


@router.get("", response_model=LinkRead, status_code=http_status.HTTP_200_OK)
async def get_link_by_uuid(link_id: str, links: LinksCRUD = Depends(get_links_crud)):
    link = await links.get(link_id=link_id)
    return link


@router.get("/user/{user_id}", response_model=List[LinkRead], status_code=http_status.HTTP_200_OK)
async def get_user_links(user_id: str, links: LinksCRUD = Depends(get_links_crud)):
    links = await links.get_all(user_id=user_id)

    return links
