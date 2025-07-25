"""empty message

Revision ID: 27f33d26d10c
Revises: 8fe239e72846
Create Date: 2025-07-14 16:04:04.208179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27f33d26d10c'
down_revision = '8fe239e72846'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('qa',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.String(length=1024), nullable=False),
    sa.Column('answer', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('qa')
    # ### end Alembic commands ###
