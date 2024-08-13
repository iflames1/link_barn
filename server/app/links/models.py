from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID
from app.core.models import TimestampModel, UUIDModel


class LinkBase(SQLModel):
    platform: str = Field(nullable=False)
    index: int = Field(nullable=False)
    url: str = Field(nullable=False)
    user_id: Optional[UUID] = Field(default=None, foreign_key="users.uuid")


class Link(TimestampModel, LinkBase, UUIDModel, SQLModel, table=True):
    __tablename__ = 'links'


class LinkRead(LinkBase, UUIDModel):
    ...


class LinkCreate(LinkBase):
    ...
