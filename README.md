# Dealership Review Portal

This project is a dealership review application rebuilt from the original full-stack capstone fork. The original fork supplied the React frontend structure and supporting sentiment service; the application has been adapted to the dealership-review requirements in the assessment rubric.

## Project Name

**Dealership Review Portal**

## Technology

- Django REST Framework backend
- React frontend
- SQLite for local development
- Token authentication
- GitHub Actions CI
- Sentiment analysis endpoint

## Demo credentials

- Admin: `admin` / `admin1234`
- User: `demo` / `demo1234`

## Run backend

```bash
cd server
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_sample_data
python manage.py runserver
```

## Run frontend

```bash
cd frontend
npm install
npm start
```

## Required API endpoints

- `POST /api-token-auth/`
- `POST /api-auth/logout/`
- `POST /api/auth/signup/`
- `GET /api/dealerships/`
- `GET /api/dealerships/<id>/`
- `GET /api/dealerships/?state=Kansas`
- `GET /api/dealerships/<id>/reviews/`
- `POST /api/reviews/`
- `GET /api/carmakes/`
- `GET /api/carmodels/`
- `POST /api/analyze-review/`
- `GET /admin/`

## Required assessment paths

- `server/frontend/static/About.html`
- `server/frontend/static/Contact.html`
- `server/frontend/src/components/Register/Register.jsx`

## Evidence

The `server/submissions/` directory contains the required filenames. Replace the command templates with the actual terminal output generated on your machine. The `screenshots/` directory lists the exact screenshot names required by the rubric.
