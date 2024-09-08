from fastapi import HTTPException, status as http_status
from sqlalchemy.ext.asyncio import AsyncSession
from app.users.models import User, UserCreate, UserUpdate, UserRead, Preview, UserUsername
from sqlalchemy import select, func
from uuid import UUID
from typing import Optional


class UsersCRUD:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, data: UserCreate) -> UserRead:
        values = data.dict()
        user = User(**values)
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def get(self, user_id: str | UUID) -> User:
        statement = select(User).where(User.uuid == user_id)
        results = await self.session.execute(statement)
        user = results.scalars().first()

        if user is None:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND, detail="User not found")

        return user

    async def patch(self, user_id: str | UUID, data: UserUpdate) -> UserRead:
        statement = select(User).where(User.uuid == user_id)
        results = await self.session.execute(statement)
        user = results.scalars().first()

        if user is None:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND, detail="User not found")

        update_data = data.dict(exclude_unset=True)
        for key, attr in update_data.items():
            setattr(user, key, attr)

        await self.session.commit()
        await self.session.refresh(user)

        return user

    async def get_all(self) -> list[User]:
        statement = select(User).order_by(User.created_at)
        results = await self.session.execute(statement)
        users = results.scalars().all()

        return users

    async def get_all_usernames(self) -> list[UserUsername]:
        statement = select(User).order_by(User.created_at)
        results = await self.session.execute(statement)
        users = results.scalars().all()

        return users


    async def get_user_profile(self, username: str) -> Preview:
        statement = select(User).where(User.username == username)
        result = await self.session.execute(statement)
        user = result.scalar_one_or_none()

        if user is None:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND, detail="User Profile not found"
            )

        return user

    async def check_field_exists(self, field: str, value: str) -> tuple[bool, Optional[User]]:
        valid_fields = ['stx_address_mainnet', "username", "supabase_user_id", "email"]
        if field not in valid_fields:
            raise HTTPException(
                status_code=http_status.HTTP_400_BAD_REQUEST, detail="Invalid field")

        query = select(User).where(getattr(User, field) == value)
        try:
            result = await self.session.execute(query)
            user = result.scalar_one_or_none()
            if user:
                return True, user
            return False, None
        except Exception as e:
            raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while checking the field: {str(e)}")

    async def get_user_uuid(self, supabase_user_id: str) -> UUID | str:
        statement = select(User).where(
            User.supabase_user_id == supabase_user_id)
        result = await self.session.execute(statement)
        user = result.scalars().first()
        if user is None:
            raise HTTPException(
                status_code=http_status.HTTP_404_NOT_FOUND, detail="User not found")

        return user.uuid
