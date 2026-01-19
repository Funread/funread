import jwt
from django.conf import settings


class JWTValidator:
    def __init__(self, token):
        # token may be an Authorization header like 'Bearer <token>'
        self.raw = token
        self.token = None
        if token and isinstance(token, str):
            if token.lower().startswith('bearer '):
                self.token = token.split(' ', 1)[1].strip()
            else:
                self.token = token.strip()

    def validar_token(self):
        if not self.token:
            print("No token provided")
            return False
        try:
            signing_key = None
            # prefer configured signing key if available
            if hasattr(settings, 'SIMPLE_JWT') and settings.SIMPLE_JWT.get('SIGNING_KEY'):
                signing_key = settings.SIMPLE_JWT.get('SIGNING_KEY')
            else:
                signing_key = settings.SECRET_KEY

            jwt.decode(self.token, signing_key, algorithms=[settings.SIMPLE_JWT.get('ALGORITHM', 'HS256')])
            print("Successful")
            return True  # El token es válido
        except jwt.ExpiredSignatureError:
            print("Session expired")
            return False  # El token ha caducado
        except jwt.InvalidTokenError:
            print("access denied")
            return False  # El token no es válido
