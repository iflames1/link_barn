from fastapi import APIRouter, status as http_status, Depends, HTTPException
from typing import List
from app.users.crud import UsersCRUD
from app.users.deps import get_users_crud
from app.links.models import LinkRead as LinkReadModel
from app.core.models import StatusMessage
from app.users.models import UserRead, UserCreate, UserUpdate, User, CheckRequest, UserProfile, Preview

router = APIRouter()


@router.post("/", response_model=UserRead, status_code=http_status.HTTP_201_CREATED)
async def create_user(data: UserCreate, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.create(data)

    return user


@router.get("/", response_model=UserRead, status_code=http_status.HTTP_200_OK)
async def get_user_by_uuid(user_id: str, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.get(user_id)
    return UserRead.from_orm(user)
    # return User(
    #     **user.dict(exclude={'links'}),
    #     links=[LinkReadModel.from_orm(link) for link in user.links]
    # )


# @router.get("/is_signed_up/{stx_address_mainnet}", response_model=StatusMessage, status_code=http_status.HTTP_200_OK)
# async def check_user_exists(stx_address_mainnet: str, users: UsersCRUD = Depends(get_users_crud)):
#     try:
#         user = await users.check_user_is_created(stx_address_mainnet)
#         return StatusMessage(status=True, message="User already exists")
#     except HTTPException as e:
#         if e.status_code == http_status.HTTP_404_NOT_FOUND:
#             return {"status": False, "message": "User not found"}
#         raise e
#     except Exception as e:
#         raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR,
#                             detail=f"An error occured: {str(e)}")


@router.post("/check", response_model=StatusMessage, status_code=http_status.HTTP_200_OK)
async def check(data: CheckRequest, users: UsersCRUD = Depends(get_users_crud)):
    try:
        exists = await users.check_field_exists(field=data.field, value=data.value)
        return StatusMessage(status=exists,
                             message=f"{data.field.capitalize()} {data.value} {'already exists' if exists else 'does not exist'}")
    except Exception as e:
        raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"An error occurred: {str(e)}")


@router.get("/profile/{username}", response_model=Preview, status_code=http_status.HTTP_200_OK)
async def get_user_profile(username: str, users: UsersCRUD = Depends(get_users_crud)):
    user = await users.get_user_profile(username)
    return UserProfile.from_orm(user)


@router.get("/all", response_model=List[User], status_code=http_status.HTTP_200_OK)
async def get_all_users(users: UsersCRUD = Depends(get_users_crud)):
    all_users = await users.get_all()
    return all_users


@router.patch("/{user_id}", response_model=UserRead, status_code=http_status.HTTP_200_OK)
async def update_user_by_uuid(user_id: str, data: UserUpdate, users: UsersCRUD = Depends(get_users_crud)):
    """Hello"""
    try:
        updated_user = await users.patch(user_id, data)
        return updated_user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
