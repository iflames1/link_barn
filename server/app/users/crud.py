from fastapi import HTTPException, status as http_status
from sqlalchemy.ext.asyncio import AsyncSession
from app.users.models import User, UserCreate, UserUpdate, UserRead
from sqlalchemy import select
from uuid import UUID


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

    async def get_all(self) -> list[UserCreate]:
        statement = select(User).order_by(User.created_at)
        results = await self.session.execute(statement)
        users = results.scalars().all()

        return users
