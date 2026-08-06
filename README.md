# Dealership Review Portal

A full-stack dealership review portal built with Django REST Framework on the backend and a React frontend scaffold. It supports:

- Browsing dealerships by state and searching by name, city, or state
- Viewing dealership detail pages with customer reviews
- Creating an account and submitting reviews
- Admin access for managing dealerships, reviews, car makes, and car models

## Backend

The backend lives in [django-backend](django-backend) and uses Django REST Framework.

### Run the backend

```bash
cd django-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_sample_data
python manage.py runserver
```

### Demo accounts

- Admin: `admin` / `admin1234`
- Demo user: `demo` / `demo1234`

### Main API endpoints

- `GET /api/dealerships/` — list dealerships with optional `state` and `search` filters
- `GET /api/dealerships/<id>/` — dealership details and reviews
- `POST /api/reviews/` — create a review (requires auth token)
- `POST /api/auth/signup/` — create a user and return a token
- `POST /api-token-auth/` — obtain an auth token for an existing user
- `GET /admin/` — admin dashboard

## Frontend

A React frontend scaffold is available in [frontend](frontend).

### Run the frontend

```bash
cd frontend
npm install
npm start
```

> Note: Node.js and npm are required to run the frontend locally.

## Sample data

The seed command populates sample dealerships and reviews so the app is usable immediately after setup.

## Project structure

- [django-backend](django-backend) — Django REST API
- [frontend](frontend) — React frontend scaffold
