"""create the ponies table

Revision ID: a797e041ab52
Revises: 989e1ac99d86
Create Date: 2020-06-24 13:17:48.811005

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a797e041ab52'
down_revision = '989e1ac99d86'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "ponies",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("breed", sa.String(20), nullable=False),
        sa.Column("birth_year", sa.Integer, nullable=False),
        sa.Column("owner_id",
                  sa.Integer,
                  sa.ForeignKey("owners.id"),
                  nullable=False)
    )


def downgrade():
    op.drop_table("ponies")
