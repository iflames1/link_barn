from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
from app.crud.links import LinksCRUD


async def get_links_crud(
        session: AsyncSession = Depends(get_async_session),
) -> LinksCRUD:
    return LinksCRUD(session=session)
