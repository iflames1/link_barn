from uuid import UUID

from fastapi import HTTPException, status as http_status
from sqlalchemy import select, delete
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel.ext.asyncio.session import AsyncSession

from app.links.models import LinkCreate, Link, LinkUpdate


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

    async def get_all(self, user_id: str | UUID) -> list[Link]:
        statement = select(Link).where(Link.user_id == user_id)
        results = await self.session.execute(statement=statement)
        links = results.scalars().all()

        return links

    async def put(self, link_id: str | UUID, data: LinkUpdate) -> Link:
        statement = select(Link).where(Link.uuid == link_id)
        results = await self.session.execute(statement=statement)
        link = results.scalar_one_or_none()

        if link is None:
            raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="Link not found")

        for key, value in data.model_dump().items():
            if key != "uuid":
                setattr(link, key, value)

        await self.session.commit()
        await self.session.refresh(link)

        return link

    async def delete(self, link_id: str | UUID) -> bool:
        try:
            link = self.get(link_id=link_id)
            # print(link)

            statement = delete(Link).where(Link.uuid == link_id)

            await self.session.execute(statement=statement)
            await self.session.commit()

            return True

        except HTTPException as e:
            if e.status_code == http_status.HTTP_404_NOT_FOUND:
                raise e

        except SQLAlchemyError as e:
            await self.session.rollback()
            raise HTTPException(status_code=http_status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
