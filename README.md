# REMI
A web app that generates a custom resume to match user provided job description. The aim is to take user's entire CV and filter out stuff that might not be relevant to the job.

## Setup

### Environment Variables
1. Navigate to the `backend` directory.
2. Copy `.env.example` to `.env` and fill in your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set `GEMINI_API_KEY`.
