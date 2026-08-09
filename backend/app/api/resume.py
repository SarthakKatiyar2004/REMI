from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.database import get_db

from app.models.resume import Resume
from app.models.education import Education
from app.models.experience import Experience
from app.models.project import Project
from app.models.custom import CustomSection, CustomEntry

from app.schemas.resume import (
    HeaderBase,
    ResumeCreate,
    ResumeUpdate,
    ResumeResponse,
)


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


RESUME_LOAD_OPTIONS = (
    joinedload(Resume.education),
    joinedload(Resume.experience),
    joinedload(Resume.projects),
    joinedload(Resume.custom_sections).joinedload(
        CustomSection.entries
    ),
)


def _set_resume_header(
    resume: Resume,
    header: HeaderBase,
) -> None:
    resume.name = header.name
    resume.email = header.email
    resume.contact = header.contact
    resume.portfolio = header.portfolio
    resume.address = header.address


def _replace_resume_children(
    resume: Resume,
    resume_data: ResumeCreate,
) -> None:
    resume.education.clear()
    resume.experience.clear()
    resume.projects.clear()
    resume.custom_sections.clear()

    for education in resume_data.education:
        resume.education.append(
            Education(
                institute_name=education.institute_name,
                degree_name=education.degree_name,
                from_date=education.from_date,
                to_date=education.to_date,
                cgpa=education.cgpa,
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
                certificate_link=experience.certificate_link,
            )
        )

    for project in resume_data.projects:
        resume.projects.append(
            Project(
                project_title=project.project_title,
                description=project.description,
                codebase_link=project.codebase_link,
                demo_link=project.demo_link,
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
                    link=entry.link,
                )
            )

        resume.custom_sections.append(custom_section)


def _get_resume_with_relations(
    db: Session,
    resume_id: int,
) -> Resume | None:
    return (
        db.query(Resume)
        .options(*RESUME_LOAD_OPTIONS)
        .filter(Resume.id == resume_id)
        .first()
    )


@router.post(
    "/",
    response_model=ResumeResponse,
)
def create_resume(
    resume_data: ResumeCreate,
    db: Session = Depends(get_db),
):
    resume = Resume()
    _set_resume_header(resume, resume_data.header)
    _replace_resume_children(resume, resume_data)

    try:
        db.add(resume)
        db.commit()
    except Exception:
        db.rollback()
        raise

    created_resume = _get_resume_with_relations(db, resume.id)

    if created_resume is None:
        raise HTTPException(
            status_code=500,
            detail="Failed to load created resume",
        )

    return created_resume


@router.get(
    "/",
    response_model=list[ResumeResponse],
)
def get_resumes(
    db: Session = Depends(get_db),
):
    return (
        db.query(Resume)
        .options(*RESUME_LOAD_OPTIONS)
        .all()
    )


@router.get(
    "/{resume_id}",
    response_model=ResumeResponse,
)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
):
    resume = _get_resume_with_relations(db, resume_id)

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return resume


@router.put(
    "/{resume_id}",
    response_model=ResumeResponse,
)
def update_resume(
    resume_id: int,
    resume_data: ResumeUpdate,
    db: Session = Depends(get_db),
):
    resume = _get_resume_with_relations(db, resume_id)

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    _set_resume_header(resume, resume_data.header)
    _replace_resume_children(resume, resume_data)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    updated_resume = _get_resume_with_relations(db, resume_id)

    if updated_resume is None:
        raise HTTPException(
            status_code=500,
            detail="Failed to load updated resume",
        )

    return updated_resume


@router.delete(
    "/{resume_id}",
)
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
):
    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    db.delete(resume)
    db.commit()

    return {
        "message": "Resume deleted successfully",
    }
