from uuid import UUID

from fastapi import HTTPException, status as http_status
from sqlalchemy import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.links.models import LinkCreate, Link


class LinksCRUD:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, data: LinkCreate) -> Link:
        values = data.model_dump()
        link = Link(**values)
        self.session.add(link)
        await self.session.commit()
        await self.session.refresh(link)

        return link

    async def get(self, link_id: str | UUID) -> Link:
        statement = select(Link).where(Link.uuid == link_id)
        results = await self.session.execute(statement=statement)
        link = results.scalar_one_or_none()

        if link is None:
            raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="Link not found")

        return link
