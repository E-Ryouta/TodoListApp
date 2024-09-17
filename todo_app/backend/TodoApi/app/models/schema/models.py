from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from ..session_manager.session_manager import engine


meta = MetaData()
meta.reflect(bind=engine)
Base = declarative_base(metadata=meta)


class Tasks(Base):
     __tablename__ = "tasks"
     __table_args__ = {"autoload": True}

class Tags(Base):
     __tablename__ = "tags"
     __table_args__ = {"autoload": True}