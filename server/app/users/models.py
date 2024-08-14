from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import event, Column, Enum
from typing import Optional, List, TYPE_CHECKING
from app.core.models import TimestampModel, UUIDModel
from pydantic import Field as PydanticField

if TYPE_CHECKING:
    from app.links.models import Link
else:
    LinkRead = object

auth_type = Enum('crypto', 'supabase', name='auth_type_enum', create_type=False)


@event.listens_for(SQLModel.metadata, "before_create")
def _create_enums(metadata, conn, **kw):
    auth_type.create(conn, checkfirst=True)


class UserBase(SQLModel):
    auth_type: str = Field(
        sa_column=Column(
            "auth_type",
            auth_type,
        )
    )
    supabase_user_id: str = Field(nullable=True)
    first_name: str = Field(nullable=True)
    last_name: str = Field(nullable=True)
    profile_picture: str = Field(nullable=True)
    email: str = Field(nullable=True)
    decentralized_id: str | None = Field(nullable=True)
    stx_address_testnet: str | None = Field(nullable=True)
    stx_address_mainnet: str | None = Field(nullable=True)
    btc_address_mainnet: str | None = Field(nullable=True)
    btc_address_testnet: str | None = Field(nullable=True)
    wallet_provider: str | None = Field(nullable=True)
    public_key: str | None = Field(nullable=True)
    gaia_hub_url: str | None = Field(nullable=True)


class User(TimestampModel, UserBase, UUIDModel, table=True):
    __tablename__ = "users"
    links: List["Link"] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})


class UserRead(UserBase, UUIDModel):
    links: List[LinkRead] = PydanticField(default_factory=list)


class UserCreate(UserBase):
    ...


class UserUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None
    email: Optional[str] = None
    decentralized_id: Optional[str] = None
    stx_address_testnet: Optional[str] = None
    stx_address_mainnet: Optional[str] = None
    btc_address_mainnet: Optional[str] = None
    btc_address_testnet: Optional[str] = None
    wallet_provider: Optional[str] = None
    public_key: Optional[str] = None
    gaia_hub_url: Optional[str] = None
