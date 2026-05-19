"""
KisanAI – Crop Disease Prediction API (FastAPI)

Endpoints:
  GET  /health        -> liveness probe
  POST /predict       -> { "image": "data:image/jpeg;base64,..." } -> diagnosis JSON

Replace `run_model()` with your trained model inference.
"""
from __future__ import annotations

import base64
import io
import os
from typing import Literal

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Optional: pillow for decoding the image when you wire your model in
try:
    from PIL import Image  # type: ignore
except Exception:  # pragma: no cover
    Image = None  # type: ignore

API_KEY = os.getenv("PYTHON_API_KEY")  # optional shared secret

app = FastAPI(title="KisanAI Model API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten to your lovable.app domain in prod
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    image: str = Field(..., description="Data URL: data:image/<type>;base64,<payload>")


class PredictResponse(BaseModel):
    disease: str
    confidence: float
    severity: Literal["Mild", "Moderate", "Severe", "None"]
    healthy: bool
    causes: str
    treatment: str
    prevention: str


def decode_data_url(data_url: str) -> bytes:
    if not data_url.startswith("data:image/"):
        raise HTTPException(status_code=400, detail="Invalid image data URL")
    try:
        _, b64 = data_url.split(",", 1)
        return base64.b64decode(b64)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not decode image: {e}")


def run_model(image_bytes: bytes) -> PredictResponse:
    """
    TODO: Replace this stub with your trained-model inference.

    Example sketch:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
        tensor = preprocess(img)
        logits = model(tensor)
        label, conf = postprocess(logits)
        return PredictResponse(...)
    """
    # Touch PIL just to validate the image when available
    if Image is not None:
        try:
            Image.open(io.BytesIO(image_bytes)).verify()
        except Exception:
            raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    # ---- DUMMY OUTPUT (replace with real model) ----
    return PredictResponse(
        disease="Leaf Blight (Early)",
        confidence=0.87,
        severity="Moderate",
        healthy=False,
        causes="Likely caused by Alternaria fungus thriving in warm, humid conditions with poor air circulation.",
        treatment="Spray Mancozeb 75% WP @ 2g/litre of water. Repeat after 10 days. Remove and burn severely infected leaves.",
        prevention="Use disease-free seeds, rotate crops, ensure proper spacing, and avoid overhead irrigation in the evening.",
    )


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest, x_api_key: str | None = Header(default=None, alias="X-API-Key")) -> PredictResponse:
    if API_KEY and x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    image_bytes = decode_data_url(req.image)
    return run_model(image_bytes)
