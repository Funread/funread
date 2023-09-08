import jwt
from django.conf import settings
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

class JWTValidator:
    def __init__(self, token):
        """
        Inicializa el validador con un token JWT.
        """
        self.token = token

    def validar_token(self):
        """
        Valida el token JWT y devuelve True si es válido, o False en caso de error.
        """
        try:
            jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            return True
        except ExpiredSignatureError:
            raise ValueError("Session expired")
        except InvalidTokenError:
            raise ValueError("Access denied")