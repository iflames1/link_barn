from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import SQLModel
from app.core.database import get_async_session
from app.users.models import User
from app.links.models import Link
from sqlalchemy import select, func

router = APIRouter()

class Stats(SQLModel):
    users: int
    links: int

@router.get("/", response_model=Stats)
async def get_stats( session: AsyncSession = Depends(get_async_session)):
    user_count = await session.scalar(select(func.count()).select_from(User))
    link_count = await session.scalar(select(func.count()).select_from(Link))

    return {"users": user_count, "links": link_count}