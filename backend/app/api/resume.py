from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 

from app.db.database import get_db
from app.models.resume import ResumeEntry
from app.schemas.resume import ResumeCreate, ResumeResponse

router = APIRouter(
    prefix = "/resume",
    tags = ["Resume"]
)

@router.post("/", response_model=ResumeResponse)
def create_resume(
    entry: ResumeCreate,
    db: Session = Depends(get_db)
):
    new_entry = ResumeEntry(
        category=entry.category,
        title=entry.title,
        description=entry.description
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return new_entry

@router.get("/", response_model=list[ResumeResponse])
def get_resume(
    db: Session = Depends(get_db)
):
    resumes = db.query(ResumeEntry).all()
    return resumes

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume_by_id(
    resume_id: int,
    db: Session = Depends(get_db)
):
    resume = db.query(ResumeEntry).filter(
        ResumeEntry.id == resume_id
    ).first()
    
    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume Entry Not Found"
        )
    
    return resume

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(
    resume_id: int,
    entry: ResumeCreate,
    db: Session = Depends(get_db)
):
    resume = db.query(ResumeEntry).filter(
        ResumeEntry.id == resume_id
    ).first()

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume Entry Not Found"
        )
    
    resume.category = entry.category
    resume.title = entry.title
    resume.description = entry.description

    db.commit()
    db.refresh(resume)

    return resume

@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):
    resume = db.query(ResumeEntry).filter(
        ResumeEntry.id == resume_id
    ).first()

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume Entry Not Found"
        )
    
    db.delete(resume)
    db.commit()

    return {
        "message": "Resume Entry Deleted Successfully"
    }