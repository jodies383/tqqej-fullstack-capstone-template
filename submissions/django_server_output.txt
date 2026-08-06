# Django backend for Dealership Reviews

Quick start instructions to run the API locally for development.

1. Create a virtual environment and install dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run migrations and create a superuser

```bash
python manage.py migrate
python manage.py createsuperuser
```

3. (Optional) create some dealerships via admin at `/admin/`

4. Run the development server

```bash
python manage.py runserver
```

Key endpoints

- `GET /api/dealerships/` - list dealerships. add `?state=CA` or `?state=all`
- `GET /api/dealerships/<id>/` - dealership details and reviews
- `POST /api/reviews/` - create a review (requires Token auth)
- `POST /api-token-auth/` - obtain auth token (send `username` and `password`)

Authentication examples

1) Signup (creates a new user and returns a token):

```bash
curl -X POST http://127.0.0.1:8000/api/auth/signup/ \
	-H "Content-Type: application/json" \
	-d '{"username":"alice","password":"s3cret","email":"alice@example.com"}'
```

Response:

```json
{
	"token": "<token_key>",
	"user": {"id":1,"username":"alice","email":"alice@example.com","first_name":"","last_name":""}
}
```

2) Obtain token for existing user (login):

```bash
curl -X POST http://127.0.0.1:8000/api-token-auth/ \
	-H "Content-Type: application/json" \
	-d '{"username":"alice","password":"s3cret"}'
```

3) Create a review using the token:

```bash
curl -X POST http://127.0.0.1:8000/api/reviews/ \
	-H "Content-Type: application/json" \
	-H "Authorization: Token <token_key>" \
	-d '{"name":"Alice","dealership":1,"review":"Great service","purchase":true,"purchase_date":"2022-01-10"}'
```
