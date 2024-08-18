"""added theme to user object

Revision ID: f710ee4aa77f
Revises: cd45ec3438aa
Create Date: 2024-08-16 05:43:19.421118

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'f710ee4aa77f'
down_revision: Union[str, None] = 'cd45ec3438aa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('theme', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.drop_column('users', 'test')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('test', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('users', 'theme')
    # ### end Alembic commands ###