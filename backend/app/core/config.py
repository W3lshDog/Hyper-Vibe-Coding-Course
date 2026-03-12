from pydantic import BaseModel


class Settings(BaseModel):
    environment: str = "development"


settings = Settings()

