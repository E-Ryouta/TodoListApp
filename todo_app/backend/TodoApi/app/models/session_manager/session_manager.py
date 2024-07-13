from sqlalchemy import create_engine, MetaData
from app.config.config import Config
from sqlalchemy.orm import sessionmaker

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)

class SessionManager:
    def __enter__(self):
        self.session = Session()
        return self.session

    def __exit__(self, exc_type, exc_value, traceback):
        self.session.close()