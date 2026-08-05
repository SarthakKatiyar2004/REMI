from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import router as resume_router

from app.db.database import Base, engine
import app.models

app = FastAPI(
    title = "REMI API",
    description = "Resume Management and Intelligence",
    version = "0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
