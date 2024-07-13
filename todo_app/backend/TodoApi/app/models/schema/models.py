from sqlalchemy import MetaData
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from ..session_manager.session_manager import engine


meta = MetaData()
meta.reflect(bind=engine)
Base = declarative_base(metadata=meta)

class TaskContainers(Base):
     __tablename__ = "task_containers"
     __table_args__ = {"autoload": True}


class Tasks(Base):
     __tablename__ = "tasks"
     __table_args__ = {"autoload": True}