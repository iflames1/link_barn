from fastapi import APIRouter, status as http_status, Depends, HTTPException

from app.users.crud import UsersCRUD
from app.users.deps import get_users_crud
from app.links.models import LinkRead as LinkReadModel
from app.users.models import UserRead, UserCreate, UserUpdate

router = APIRouter()


@router.post("/", response_model=UserRead, status_code=http_status.HTTP_201_CREATED)
async def create_user(data: UserCreate, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.create(data)

    return user


@router.get("/", response_model=UserRead, status_code=http_status.HTTP_200_OK)
async def get_user_by_uuid(user_id: str, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.get(user_id)
    return UserRead(
        **user.dict(exclude={'links'}),
        links=[LinkReadModel.from_orm(link) for link in user.links]
    )


@router.put("/{user_id}", response_model=UserRead, status_code=http_status.HTTP_200_OK)
async def update_user_by_uuid(user_id: str, data: UserUpdate, users: UsersCRUD = Depends(get_users_crud)):
    """Hello"""
    try:
        updated_user = await users.put(user_id, data)
        return updated_user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
