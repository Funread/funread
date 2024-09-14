# Usa una imagen base de Python
FROM python:3.11

# Establece el directorio de trabajo
WORKDIR /funread_backend

# Install system dependencies
RUN apt-get update && apt-get install -y gcc default-mysql-client

# Instala las dependencias
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Django application
COPY . .

# Copy custom entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Expone el puerto en el que la aplicación se ejecuta (si es necesario)
EXPOSE 8000

# Use the custom entrypoint script
ENTRYPOINT ["./entrypoint.sh"]