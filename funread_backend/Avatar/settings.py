import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables desde .env

HUGGING_FACE_API_TOKEN = os.getenv("HUGGING_FACE_API_TOKEN")
