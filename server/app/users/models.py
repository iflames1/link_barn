from sqlmodel import SQLModel, Field
from sqlalchemy import event, Column, Enum
from sqlalchemy.dialects import postgresql
from app.core.models import TimestampModel, UUIDModel

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
    email: str = Field(nullable=True)
    decentralized_id: str | None = Field(nullable=True)
    stx_address_testnet: str | None = Field(nullable=True)
    stx_address_mainnet: str | None = Field(nullable=True)
    btc_address_mainnet: str | None = Field(nullable=True)
    btc_address_testnet: str | None = Field(nullable=True)
    wallet_provider: str | None = Field(nullable=True)
    public_key: str | None = Field(nullable=True)
    gaia_hub_url: str | None = Field(nullable=True)


class User(TimestampModel, UserBase, UUIDModel, SQLModel, table=True):
    __tablename__ = "users"


class UserRead(UserBase, UUIDModel):
    ...


class UserCreate(UserBase):
    ...
