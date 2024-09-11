"""
The api routes for the transactions
"""
from fastapi import APIRouter, status as http_status, Depends, HTTPException
from app.transactions.crud import TransactionsCRUD
from app.transactions.deps import get_transactions_crud
from app.transactions.models import TransactionBase
from typing import List
from app.core.models import StatusMessage

router = APIRouter()


@router.post("", response_model=TransactionBase, status_code=http_status.HTTP_201_CREATED)
async def create_transaction(data: TransactionBase, transactions: TransactionsCRUD = Depends(get_transactions_crud)):
    transaction = await transactions.create(data=data)

    return transaction

@router.get("", response_model=List[TransactionBase], status_code=http_status.HTTP_200_OK)
async def get_all_transactions(transactions: TransactionsCRUD = Depends(get_transactions_crud)):
    transactions = await transactions.get_all()

    return transactions