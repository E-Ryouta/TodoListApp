FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN pip install Flask psycopg2-binary inflection sqlalchemy gunicorn
EXPOSE 5001
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5001", "run:app"]

