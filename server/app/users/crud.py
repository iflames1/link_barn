from fastapi import HTTPException, status as http_status
from sqlalchemy.ext.asyncio import AsyncSession
from app.users.models import User, UserCreate
from sqlalchemy import select
from uuid import UUID


class UsersCRUD:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, data: UserCreate) -> User:
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
            raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="User not found")

        return user
