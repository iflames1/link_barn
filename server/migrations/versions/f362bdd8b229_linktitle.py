"""linktitle

Revision ID: f362bdd8b229
Revises: 8f57bf51b253
Create Date: 2024-09-06 02:27:05.853812

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'f362bdd8b229'
down_revision: Union[str, None] = '8f57bf51b253'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('links', sa.Column('link_title', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.alter_column('links', 'url',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('links', 'url',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('links', 'link_title')
    # ### end Alembic commands ###