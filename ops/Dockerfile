# Use an official Python runtime based on Debian 10 "buster" as a parent image.
FROM python:3.8.1-slim-buster

# Add user that will be used in the container.
RUN useradd ibuyuser

# Port used by this container to serve HTTP.
EXPOSE 8000

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
  PORT=8000

# Set timezone
ENV TZ="Europe/Stockholm"

# Install system packages required by Wagtail and Django.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
  build-essential \
  libpq-dev \
  vim \
  iputils-ping \
  libmariadbclient-dev \
  libjpeg62-turbo-dev \
  zlib1g-dev \
  libwebp-dev \
  && rm -rf /var/lib/apt/lists/*

# Install the project requirements.
COPY requirements.txt /
RUN pip install -r /requirements.txt


# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "brokerxuser" user.
RUN chown ibuyuser:ibuyuser /app

# Copy the source code of the project into the container.
COPY --chown=ibuyuser:ibuyuser . .

# Use user "ibuyuser" to run the build commands below and the server itself.
USER ibuyuser

# Collect static files.
RUN python manage.py collectstatic --noinput --clear

# SET DJANGO_SETTINGS environment for the production server.
ENV DJANGO_SETTINGS_MODULE=backend.core.settings.prod

# DATABASE ACCESS ARGS
ARG ibuy_database_host 
ARG ibuy_database_port 
ARG ibuy_database_name
ARG ibuy_database_user
ARG ibuy_database_password

# DATABASE ACCESS ENVS
ENV IBUY_DATABASE_HOST=$ibuy_database_host 
ENV IBUY_DATABASE_PORT=$ibuy_database_port 
ENV IBUY_DATABASE_NAME=$ibuy_database_user 
ENV IBUY_DATABASE_USER=$ibuy_database_user 
ENV IBUY_DATABASE_PASSWORD=$ibuy_database_password

# Run migrations
RUN python manage.py migrate

# Serve the application
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=2", "--threads=4", "--worker-class=gthread"]