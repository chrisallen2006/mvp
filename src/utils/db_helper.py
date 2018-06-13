"""Implements utility functions for interacting with a database."""
import configparser
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

config = configparser.ConfigParser()
config.read('config.ini')

DATABASE_URL = config['PRODUCTION']['DATABASE_URL']
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
