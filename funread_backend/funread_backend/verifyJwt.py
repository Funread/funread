import jwt
from django.conf import settings

class JWTValidator:
    def __init__(self, token):
        self.token = token

    def validar_token(self):
        try:
            # Verifica el token utilizando la clave secreta configurada en settings.py
            jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            print("Successful")
            return True  # El token es válido
        except jwt.ExpiredSignatureError:
            print("Session expired")
            return False  # El token ha caducado
        except jwt.InvalidTokenError:
            print("access denied")
            return False  # El token no es válido

    #Para cuando se requiere extraer el id del usuario del Token, en caso de necesitar filtrar información tomando en cuenta el id del usuario
    def obtener_usuario_id(self):
        try:
            # Decodifica el token para obtener el payload
            payload = jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            return payload.get('user_id')  # Asegúrate de que 'user_id' esté en el token
        except jwt.InvalidTokenError:
            return None  # Retorna None si el token no es válido
