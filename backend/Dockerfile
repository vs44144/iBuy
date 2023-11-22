# Use an official Python runtime based on Debian 10 "buster" as a parent image.
FROM python:3.9-slim-bullseye

# Port used by this container to serve HTTP.
EXPOSE 8000

# Set environment variables.
ENV PYTHONUNBUFFERED=1 \
  PORT=8000 \
  TZ="Europe/Stockholm"

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Copy the project inside the app
COPY . /app

# Install the project requirements.
COPY backend/requirements.txt /
RUN pip install -r backend/requirements.txt

# Collect static files.
COPY backend/ .
RUN python backend/manage.py collectstatic --noinput 
RUN python backend/manage.py migrate

# Serve the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
