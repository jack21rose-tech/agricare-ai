# KisanAI – Python Model API

FastAPI service that the `/scan` page calls to diagnose leaf images.
Currently returns dummy data — swap `run_model()` in `main.py` with your
trained model when ready.

## Run locally

```bash
cd python-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Test:
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="}'
```

## Deploy

Any host that runs a Docker container works. Cheap/fast options:

- **Render** – New → Web Service → Docker → connect repo, root = `python-api/`
- **Railway** – New → Deploy from GitHub repo → root = `python-api/`
- **Fly.io** – `cd python-api && fly launch`
- **HuggingFace Spaces (Docker SDK)** – push this folder as a Space
- **Your own VM** – `docker build -t kisan-api . && docker run -p 8000:8000 kisan-api`

After deploy you'll get a public URL like `https://kisan-api.onrender.com`.

## Wire it to the Lovable app

Add these secrets to the Lovable project (Cloud → Secrets):

| Secret            | Value                                  | Required |
|-------------------|----------------------------------------|----------|
| `PYTHON_API_URL`  | e.g. `https://kisan-api.onrender.com`  | yes      |
| `PYTHON_API_KEY`  | any random string (also set as env var on the Python host) | optional |

`src/lib/scan.functions.ts` reads these and forwards each scan to
`POST {PYTHON_API_URL}/predict`.

## Swapping in your real model

In `main.py`, replace the body of `run_model(image_bytes)`:

```python
img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
tensor = preprocess(img)                  # your transform
with torch.no_grad():
    logits = model(tensor.unsqueeze(0))   # your loaded model
label, conf = postprocess(logits)         # -> ("Leaf Blight (Early)", 0.87)
return PredictResponse(
    disease=label, confidence=conf, severity=..., healthy=label == "Healthy",
    causes=..., treatment=..., prevention=...,
)
```

Load the model **once at startup** (module scope or `@app.on_event("startup")`)
so each request reuses it.
