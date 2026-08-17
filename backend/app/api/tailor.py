from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from google import genai
import os

from app.db.database import get_db
from app.api.resume import _get_resume_with_relations
from app.schemas.resume import ResumeCreate, ResumeResponse

router = APIRouter(
    prefix="/tailor",
    tags=["Tailor Resume"]
)

class TailorRequest(BaseModel):
    resume_id: int
    job_description: str

@router.post(
    "/",
    response_model=ResumeCreate,
)
def tailor_resume(
    request: TailorRequest,
    db: Session = Depends(get_db),
):
    # Retrieve the master resume
    resume = _get_resume_with_relations(db, request.resume_id)
    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    resume_schema = ResumeResponse.model_validate(resume)

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY environment variable is not set.",
        )

    # Initialize Gemini client
    client = genai.Client(api_key=api_key)

    prompt = f"""
    You are an expert resume writer. I am providing you with a master resume and a job description.
    Your task is to tailor the master resume to best fit the job description.
    You must return the tailored resume as a JSON object matching the requested schema.
    Remove irrelevant experience/projects, and tweak the descriptions to highlight relevant skills.
    
    Master Resume:
    {resume_schema.model_dump_json()}
    
    Job Description:
    {request.job_description}
    """

    try:
        interaction = client.interactions.create(
            model="gemini-3.7-flash",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": ResumeCreate.model_json_schema()
            },
        )

        tailored_resume = ResumeCreate.model_validate_json(interaction.output_text)
        return tailored_resume

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate tailored resume: {str(e)}",
        )
