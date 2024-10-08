"""Add reference for AssignmentTasks

Revision ID: d8bc71595932
Revises: 6295e05ff7d0
Create Date: 2024-07-12 18:59:50.242716

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel # noqa: F401


# revision identifiers, used by Alembic.
revision: str = 'd8bc71595932'
down_revision: Union[str, None] = '6295e05ff7d0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('assignmenttask', sa.Column('reference_file', sa.VARCHAR(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('assignmenttask', 'reference_file')
    # ### end Alembic commands ###
