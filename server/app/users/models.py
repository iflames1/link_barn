from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import event, Column, Enum
from typing import Optional, List, TYPE_CHECKING
from app.core.models import TimestampModel, UUIDModel

if TYPE_CHECKING:
    from app.links.models import Link
else:
    LinkRead = object

auth_type = Enum('crypto', 'supabase',
                 name='auth_type_enum', create_type=False)


@event.listens_for(SQLModel.metadata, "before_create")
def _create_enums(metadata, conn, **kw):
    # Create the enum
    auth_type.create(conn, checkfirst=True)


class UserProfile(SQLModel):
    bio: str | None = Field(default=None)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)
    theme: str | None = Field(default=None)
    profile_picture: str | None = Field(default=None)
    email: str | None = Field(default=None)
    username: str | None = Field(default=None)


class UserBase(UserProfile):
    auth_type: str = Field(sa_column=Column("auth_type", auth_type))
    supabase_user_id: str | None = Field(default=None)
    decentralized_id: str | None = Field(default=None)
    stx_address_testnet: str | None = Field(default=None)
    stx_address_mainnet: str | None = Field(default=None)
    btc_address_mainnet: str | None = Field(default=None)
    btc_address_testnet: str | None = Field(default=None)
    wallet_provider: str | None = Field(default=None)
    public_key: str | None = Field(default=None)
    gaia_hub_url: str | None = Field(default=None)


class User(UserBase, TimestampModel, UUIDModel, table=True):
    __tablename__ = "users"
    links: List["Link"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})


class UserRead(UserBase, UUIDModel):
    links: List[LinkRead] = []

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    pass


class UserUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    decentralized_id: Optional[str] = None
    stx_address_testnet: Optional[str] = None
    stx_address_mainnet: Optional[str] = None
    btc_address_mainnet: Optional[str] = None
    btc_address_testnet: Optional[str] = None
    wallet_provider: Optional[str] = None
    public_key: Optional[str] = None
    gaia_hub_url: Optional[str] = None


class CheckRequest(SQLModel):
    field: str
    value: str


class Preview(UserProfile):
    links: List[LinkRead] = []

    class Config:
        orm_mode = True
