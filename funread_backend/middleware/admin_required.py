"""
Middleware para verificar que el usuario es administrador
"""
from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from funread_backend.verifyJwt import JWTValidator
from funread_backend.jwt_service import JwtService
from Userroles.models import Userroles


def admin_required(view_func):
    """
    Decorator para endpoints que requieren permisos de administrador.
    Verifica que el usuario tenga el rol 'administrativo'.
    """
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        try:
            # 1. Validar token JWT
            authorization_header = request.headers.get('Authorization')
            if not authorization_header:
                return Response(
                    {"error": "No se proporcionó token de autorización"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # Validar formato del token
            validator = JWTValidator(authorization_header)
            es_valido = validator.validar_token()
            
            if not es_valido:
                return Response(
                    {"error": "Token inválido o expirado"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # 2. Extraer user_id del token
            jwt_service = JwtService(authorization_header)
            user_id = jwt_service.get_user_id()
            
            if not user_id:
                return Response(
                    {"error": "Token malformado"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # 3. Verificar rol de administrador
            try:
                user_role = Userroles.objects.get(iduser=user_id)
                
                # Verificar que el rol sea exactamente 'administrativo'
                if user_role.idrole.role != 'administrativo':
                    return Response(
                        {"error": "Acceso denegado. Se requieren permisos de administrador."}, 
                        status=status.HTTP_403_FORBIDDEN
                    )
                
            except Userroles.DoesNotExist:
                return Response(
                    {"error": "Usuario sin rol asignado"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # 4. Si todo es válido, ejecutar la vista
            return view_func(request, *args, **kwargs)
            
        except Exception as e:
            print(f"Error en admin_required middleware: {e}")
            return Response(
                {"error": "Error en la verificación de permisos"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    return wrapper
