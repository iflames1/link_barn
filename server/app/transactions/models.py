from sqlmodel import SQLModel, Field, Relationship
from app.core.models import TimestampModel, UUIDModel


class TransactionBase(SQLModel):
    user_id: str | None = Field(default=None, nullable=False)
    txid: str | None = Field(default=None)
    wallet: str | None = Field(default=None)
    status: str | None = Field(default=None)
    amount: int | None = Field(default=None)
    prev_tier: str | None = Field(default=None)


class Transaction(TransactionBase, TimestampModel, UUIDModel, table=True):
    __tablename__ = "transactions"
