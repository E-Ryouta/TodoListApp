import os

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost:5432")