"""Enum updates

Revision ID: 6295e05ff7d0
Revises: df2981bf24dd
Create Date: 2024-07-11 20:46:26.582170

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa # noqa: F401
import sqlmodel # noqa: F401
from alembic_postgresql_enum import TableReference # type: ignore

# revision identifiers, used by Alembic.
revision: str = '6295e05ff7d0'
down_revision: Union[str, None] = 'df2981bf24dd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.sync_enum_values('public', 'activitytypeenum', ['TYPE_VIDEO', 'TYPE_DOCUMENT', 'TYPE_DYNAMIC', 'TYPE_ASSIGNMENT', 'TYPE_CUSTOM'],
                        [TableReference(table_schema='public', table_name='activity', column_name='activity_type')],
                        enum_values_to_rename=[])
    op.sync_enum_values('public', 'activitysubtypeenum', ['SUBTYPE_DYNAMIC_PAGE', 'SUBTYPE_VIDEO_YOUTUBE', 'SUBTYPE_VIDEO_HOSTED', 'SUBTYPE_DOCUMENT_PDF', 'SUBTYPE_DOCUMENT_DOC', 'SUBTYPE_ASSIGNMENT_ANY', 'SUBTYPE_CUSTOM'],
                        [TableReference(table_schema='public', table_name='activity', column_name='activity_sub_type')],
                        enum_values_to_rename=[])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.sync_enum_values('public', 'activitysubtypeenum', ['SUBTYPE_DYNAMIC_PAGE', 'SUBTYPE_VIDEO_YOUTUBE', 'SUBTYPE_VIDEO_HOSTED', 'SUBTYPE_DOCUMENT_PDF', 'SUBTYPE_DOCUMENT_DOC', 'SUBTYPE_ASSESSMENT_QUIZ', 'SUBTYPE_CUSTOM'],
                        [TableReference(table_schema='public', table_name='activity', column_name='activity_sub_type')],
                        enum_values_to_rename=[])
    op.sync_enum_values('public', 'activitytypeenum', ['TYPE_VIDEO', 'TYPE_DOCUMENT', 'TYPE_DYNAMIC', 'TYPE_ASSESSMENT', 'TYPE_CUSTOM'],
                        [TableReference(table_schema='public', table_name='activity', column_name='activity_type')],
                        enum_values_to_rename=[])
    # ### end Alembic commands ###
