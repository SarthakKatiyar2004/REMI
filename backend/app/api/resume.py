from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.database import get_db

from app.models.resume import Resume
from app.models.education import Education
from app.models.experience import Experience
from app.models.project import Project
from app.models.custom import CustomSection, CustomEntry

from app.schemas.resume import (
    ResumeCreate,
    ResumeResponse
)


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post(
    "/",
    response_model=ResumeResponse
)
def create_resume(
    resume_data: ResumeCreate,
    db: Session = Depends(get_db)
):

    resume = Resume(
        name=resume_data.header.name,
        email=resume_data.header.email,
        contact=resume_data.header.contact,
        portfolio=resume_data.header.portfolio,
        address=resume_data.header.address
    )


    for education in resume_data.education:
        resume.education.append(
            Education(
                institute_name=education.institute_name,
                degree_name=education.degree_name,
                from_date=education.from_date,
                to_date=education.to_date,
                cgpa=education.cgpa
            )
        )


    for experience in resume_data.experience:
        resume.experience.append(
            Experience(
                role_title=experience.role_title,
                institute_name=experience.institute_name,
                from_date=experience.from_date,
                to_date=experience.to_date,
                location=experience.location,
                description=experience.description,
                certificate_link=experience.certificate_link
            )
        )


    for project in resume_data.projects:
        resume.projects.append(
            Project(
                project_title=project.project_title,
                description=project.description,
                codebase_link=project.codebase_link,
                demo_link=project.demo_link
            )
        )


    for section in resume_data.custom_sections:

        custom_section = CustomSection(
            title=section.title
        )


        for entry in section.entries:
            custom_section.entries.append(
                CustomEntry(
                    title=entry.title,
                    description=entry.description,
                    link=entry.link
                )
            )


        resume.custom_sections.append(
            custom_section
        )


    try:
        db.add(resume)
        db.commit()
        db.refresh(resume)

    except Exception:
        db.rollback()
        raise


    return resume



@router.get(
    "/",
    response_model=list[ResumeResponse]
)
def get_resumes(
    db: Session = Depends(get_db)
):

    return (
        db.query(Resume)
        .options(
            joinedload(Resume.education),
            joinedload(Resume.experience),
            joinedload(Resume.projects),
            joinedload(Resume.custom_sections)
        )
        .all()
    )



@router.get(
    "/{resume_id}",
    response_model=ResumeResponse
)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .options(
            joinedload(Resume.education),
            joinedload(Resume.experience),
            joinedload(Resume.projects),
            joinedload(Resume.custom_sections)
        )
        .filter(
            Resume.id == resume_id
        )
        .first()
    )


    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )


    return resume



@router.delete(
    "/{resume_id}"
)
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id
        )
        .first()
    )


    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )


    db.delete(resume)
    db.commit()


    return {
        "message": "Resume deleted successfully"
    }