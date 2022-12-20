from typing import Union
from fastapi import FastAPI
import logging.config
from fastapi.logger import logger as fastapi_logger
from os import path

from .users import user_routes
from .auth import login_route
from .projects import project_routes
from .db.database import SessionLocal, engine, Base

# setup loggers
log_file_path = path.join(path.dirname(path.abspath('logging.conf')), 'logging.conf')

logging.config.fileConfig('./src/backend/logging.conf', disable_existing_loggers=False) # main.py runs from code/
logger = logging.getLogger(__name__)

gunicorn_error_logger = logging.getLogger("gunicorn.error")
gunicorn_logger = logging.getLogger("gunicorn")
uvicorn_access_logger = logging.getLogger("uvicorn.access")
uvicorn_access_logger.handlers = gunicorn_error_logger.handlers

fastapi_logger.handlers = gunicorn_error_logger.handlers

if __name__ != "__main__":
    fastapi_logger.setLevel(gunicorn_logger.level)
else:
    fastapi_logger.setLevel(logging.DEBUG)



Base.metadata.create_all(bind=engine)

api = FastAPI()

api.include_router(user_routes.router)
api.include_router(login_route.router)
api.include_router(project_routes.router)

@api.get("/")
def read_root():
    logger.info("logging from the root logger")
    return {"Hello": "Big, big World"}

@api.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}