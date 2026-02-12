#!/bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn redcrypt.wsgi --bind 0.0.0.0:8000