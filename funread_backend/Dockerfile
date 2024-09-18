# Use a lightweight Python base image
FROM python:3.11

# Set environment variables for Python to prevent .pyc files and enable unbuffered logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /funread_backend

RUN apt-get update && apt-get install -y gcc default-mysql-client

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Django application
COPY . .

# Copy custom entrypoint script and make it executable
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Expose port 8000 for the Django app
EXPOSE 8000

# Use the custom entrypoint script
ENTRYPOINT ["./entrypoint.sh"]