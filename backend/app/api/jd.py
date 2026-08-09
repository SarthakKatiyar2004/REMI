import io

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel, ConfigDict, Field
from pypdf import PdfReader
from pypdf.errors import PdfReadError

router = APIRouter(
    prefix="/jd",
    tags=["Job Description"],
)


MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5MB
ALLOWED_CONTENT_TYPES = {"application/pdf"}

# A text-based PDF should yield a reasonable amount of extractable
# text. Below this we assume the PDF is a scan/image, which we don't
# support until OCR is added.
MIN_TEXT_CHARACTERS = 20


class JDUploadResponse(BaseModel):
    filename: str

    size_bytes: int = Field(alias="sizeBytes")
    page_count: int = Field(alias="pageCount")
    extracted_characters: int = Field(alias="extractedCharacters")
    is_text_based: bool = Field(alias="isTextBased")

    message: str

    model_config = ConfigDict(populate_by_name=True)


def _is_pdf(file: UploadFile) -> bool:
    filename = (file.filename or "").lower()
    return (
        file.content_type in ALLOWED_CONTENT_TYPES
        or filename.endswith(".pdf")
    )


@router.post(
    "/upload",
    response_model=JDUploadResponse,
)
async def upload_jd(
    file: UploadFile = File(...),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was provided.",
        )

    if not _is_pdf(file):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported.",
        )

    contents = await file.read()

    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="This file is empty.",
        )

    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail="This file is larger than 5MB. Please upload a smaller PDF.",
        )

    try:
        reader = PdfReader(io.BytesIO(contents))
        page_count = len(reader.pages)
        extracted_text = "".join(
            page.extract_text() or "" for page in reader.pages
        )
    except PdfReadError:
        raise HTTPException(
            status_code=400,
            detail="Could not read this PDF. It may be corrupted.",
        )

    extracted_characters = len(extracted_text.strip())
    is_text_based = extracted_characters >= MIN_TEXT_CHARACTERS

    message = (
        "Job description uploaded and text extracted successfully."
        if is_text_based
        else "We couldn't find readable text in this PDF. Scanned/image "
        "PDFs aren't supported yet — OCR support is coming soon."
    )

    return JDUploadResponse(
        filename=file.filename,
        sizeBytes=len(contents),
        pageCount=page_count,
        extractedCharacters=extracted_characters,
        isTextBased=is_text_based,
        message=message,
    )
