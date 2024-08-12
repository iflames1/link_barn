from pydantic import BaseModel, HttpUrl


class LinkBase(BaseModel):
    url: HttpUrl
