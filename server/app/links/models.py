from sqlmodel import SQLModel, Field

from app.core.models import TimestampModel, UUIDModel


class LinkBase(SQLModel):
    platform: str = Field(nullable=False)
    index: int = Field(nullable=False)
    url: str = Field(nullable=False)


class Link(TimestampModel, LinkBase, UUIDModel, SQLModel, table=True):
    __tablename__ = 'links'


class LinkRead(LinkBase, UUIDModel):
    ...


class LinkCreate(LinkBase):
    ...
