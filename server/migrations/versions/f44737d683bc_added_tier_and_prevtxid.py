"""added tier and prevTxID

Revision ID: f44737d683bc
Revises: cb216be01e93
Create Date: 2024-09-11 01:58:06.442933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'f44737d683bc'
down_revision: Union[str, None] = 'cb216be01e93'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('links', 'link_title',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_constraint('fk_links_user_id_users', 'links', type_='foreignkey')
    op.create_foreign_key(None, 'links', 'users', ['user_id'], ['uuid'])
    op.add_column('users', sa.Column('tier', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('users', sa.Column('prevTxID', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'prevTxID')
    op.drop_column('users', 'tier')
    op.drop_constraint(None, 'links', type_='foreignkey')
    op.create_foreign_key('fk_links_user_id_users', 'links', 'users', ['user_id'], ['uuid'], ondelete='CASCADE')
    op.alter_column('links', 'link_title',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###