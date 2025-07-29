# Resume-JD Matcher

An **AI-powered application** that analyzes resumes against job descriptions to generate **match percentages**, **detailed analysis**, **keyword insights**, and **improvement suggestions**.

---

## 🚀 Key Features
- **Match Percentage** – Evaluates how well a resume matches the job description
- **Resume Analyzer** – Analyzes content, skills, and structure
- **Improvement Suggestions** – Offers personalized recommendations
- **Keyword Analysis** – Detects missing and present keywords

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, React Dropzone, Lucide React, React Hot Toast
- **Backend:** Firebase Firestore, Python FastAPI
- **AI/ML:** NLTK, spaCy, scikit-learn, Transformers (NLP models)

---

## 🔄 System Workflow
1. User uploads a resume (PDF/DOC/DOCX/TXT)
2. User pastes the job description
3. The AI backend processes the inputs to:
    - ✅ Calculate match percentage
    - ✅ Provide keyword and skill analysis
    - ✅ Suggest improvements to the resume

---

## 🧩 API Overview
The backend is built using **FastAPI** and exposes endpoints to handle text analysis using ML/NLP models.

Example request to `/api/analyze`:
```json
{
  "resume_text": "Your resume text...",
  "job_description": "The job description...",
  "analysis_type": "match|analyze|suggestions|keywords"
}