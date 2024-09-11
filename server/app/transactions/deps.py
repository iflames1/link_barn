from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
# from app.links.crud import LinksCRUD
from app.transactions.crud import TransactionsCRUD


async def get_transactions_crud(
        session: AsyncSession = Depends(get_async_session),
) -> TransactionsCRUD:
    return TransactionsCRUD(session=session)
