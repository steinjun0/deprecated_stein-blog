FROM python:3.9-slim-buster

ENV PYTHONUNBUFFERED=0

WORKDIR /home/web-compose/django

RUN apt update && apt -y install libpq-dev gcc git procps
RUN pip install poetry
ADD pyproject.toml poetry.lock ./
RUN poetry install --no-interaction
