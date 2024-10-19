# jwt_service.py
import jwt  # Importa la librería para trabajar con JWT
from django.conf import settings  # Importa las configuraciones del proyecto

class JwtService:
    def _init_(self, token):
        self.token = token  # Almacena el token que se pasa a la clase

    def is_token_valid(self):
        try:
            # Verifica si el token es válido
            jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            return True  # Retorna True si el token es válido
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return False  # Retorna False si el token es inválido

    def get_user_id(self):
        try:
            # Decodifica el token para obtener el 'user_id'
            payload = jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            return payload.get('user_id')  # Extrae el 'user_id' del token
        except jwt.InvalidTokenError:
            return None  # Retorna None si el token es inválido