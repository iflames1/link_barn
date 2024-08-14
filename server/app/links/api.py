from fastapi import APIRouter, status as http_status, Depends, HTTPException
from app.links.crud import LinksCRUD
from app.links.deps import get_links_crud
from app.links.models import LinkRead, LinkCreate, LinkUpdate
from typing import List
from app.core.models import StatusMessage

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


@router.put("/{link_id}", response_model=LinkRead, status_code=http_status.HTTP_200_OK)
async def update_link_by_id(link_id: str, data: LinkUpdate, links: LinksCRUD = Depends(get_links_crud)):
    try:
        link = await links.put(link_id=link_id, data=data)
        return link
    except HTTPException as e:
        return e
    except Exception as e:
        raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


# dcf1e5f0-fe44-4f54-8d36-eb8b03c024d9

@router.delete("/{link_id}", response_model=StatusMessage, status_code=http_status.HTTP_200_OK)
async def delete_link_by_id(link_id: str, links: LinksCRUD = Depends(get_links_crud)):
    status = await links.delete(link_id=link_id)

    return {"status": status, "message": "Link has been deleted"}
