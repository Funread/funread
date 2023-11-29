# Usa una imagen base de Python
FROM python:3.11

# Establece el directorio de trabajo
WORKDIR /funread_backend

# Copia los archivos de la aplicación al contenedor
COPY . /funread_backend

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Realizar migraciones
RUN python manage.py makemigrations
RUN python manage.py migrate

# Expone el puerto en el que la aplicación se ejecuta (si es necesario)
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]