import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:password@127.0.0.1:5432/todo_database"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
