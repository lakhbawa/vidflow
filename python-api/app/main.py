from typing import Union

from fastapi import FastAPI, APIRouter

router = APIRouter(prefix="/api")

@router.get("/")
def read_root():
    return {"Hello": "World2"}


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app = FastAPI()
app.include_router(router)