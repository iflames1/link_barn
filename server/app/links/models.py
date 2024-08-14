from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from uuid import UUID
from app.core.models import TimestampModel, UUIDModel

if TYPE_CHECKING:
    from app.users.models import User


class LinkBase(SQLModel):
    platform: str = Field(nullable=False)
    index: int = Field(nullable=False)
    url: str = Field(nullable=False)
    user_id: Optional[UUID] = Field(default=None, foreign_key="users.uuid")


class Link(TimestampModel, LinkBase, UUIDModel, table=True):
    __tablename__ = 'links'
    user: "User" = Relationship(back_populates="links")


class LinkRead(LinkBase, UUIDModel):
    ...


class LinkCreate(LinkBase):
    ...


class LinkUpdate(SQLModel):
    platform: Optional[str] = Field(default=None)
    index: Optional[int] = Field(default=None)
    url: Optional[str] = Field(default=None)
