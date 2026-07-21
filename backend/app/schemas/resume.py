from pydantic import BaseModel

class ResumeCreate(BaseModel):
    category: str
    title: str
    description: str | None = None

class ResumeResponse(BaseModel):
    id: int
    category: str
    title: str
    description: str | None = None

    class Config:
        from_attributes = True