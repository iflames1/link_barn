from fastapi import APIRouter, status as http_status, Depends
from starlette import status

from app.users.crud import UsersCRUD
from app.users.deps import get_users_crud
from app.users.models import UserRead, UserCreate

router = APIRouter()


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(data: UserCreate, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.create(data)

    return user


@router.get("/", response_model=UserRead, status_code=status.HTTP_200_OK)
async def get_user_by_uuid(user_id: str, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.get(user_id)
    return user
