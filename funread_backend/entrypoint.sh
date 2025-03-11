#!/bin/bash

# Wait for MySQL to be available
echo "Waiting for MySQL to be available..."
while ! mysql -h"mysql" -u"root" -p"root" -e 'select 1'; do
  sleep 1
done

#Create migrations
echo "Creating Django migrations..."
python manage.py makemigrations

# Run Django migrations
echo "Running Django migrations..."
python3 manage.py migrate --noinput

# Load initial data
echo "Loading initial data..."
mysql -h"mysql" -u"root" -p"root" FUNREAD < /docker-entrypoint-initdb.d/init.sql

# Start the Django server
echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000

