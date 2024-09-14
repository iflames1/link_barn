"""
Crud module for transactions
"""
from typing import List
from uuid import UUID
from fastapi import HTTPException, status as http_status
from sqlalchemy import select, delete
from sqlmodel.ext.asyncio.session import AsyncSession
from app.transactions.models import Transaction, TransactionBase


class TransactionsCRUD:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, data: TransactionBase) -> Transaction:
        """
        Create a new transaction
        @data: The new link to be created
        """
        values = data.model_dump()
        transaction = Transaction(**values)
        self.session.add(transaction)
        await self.session.commit()
        await self.session.refresh(transaction)

        return transaction

    async def get_all(self) -> List[Transaction]:
        statement = select(Transaction)
        results = await self.session.execute(statement)
        transactions = results.scalars().all()

        return transactions

    async def get_transaction_by_user_id(self, user_id: UUID) -> Transaction:
        statement = select(Transaction).where(Transaction.user_id == user_id)
        results = await self.session.execute(statement)
        transactions = results.scalars().all()
        return transactions