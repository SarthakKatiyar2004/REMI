from fastapi import FastAPI
from app.api.resume import router as resume_router
from app.db.database import Base, engine
from app.models.resume import ResumeEntry

app = FastAPI(
    title = "REMI API",
    description = "Resume Management and Intelligence",
    version = "0.1.0",
)

Base.metadata.create_all(bind=engine)

app.include_router(resume_router)

@app.get("/")
async def root():
    return {
        "message" : "Welcome"
    }

@app.get("/health")
async def health_check():
    return {
        "status" : "healthy"
    }