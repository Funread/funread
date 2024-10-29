from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import UserLevels
from .serializers import UserLevelsSerializer
import verifyJwt



# Crear un nuevo registro de UserLevels
@api_view(['POST'])
def create_user_level(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Validar los datos de la solicitud usando el serializador
        serializer = UserLevelsSerializer(data=request.data)
        
        # Verificar si los datos son válidos
        if serializer.is_valid():
            serializer.save()  # Guardar el nuevo nivel del usuario en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Si los datos no son válidos, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

#Listar todos los niveles de usuarios
@api_view(['GET'])
def list_user_levels(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        

        # Obtener todos los registros de UserLevels
        user_levels = UserLevels.objects.all()
        serializer = UserLevelsSerializer(user_levels, many=True)
        
        # Devolver la lista de niveles
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Obtener un nivel específico por ID
@api_view(['GET'])
def get_user_level(request, user_level_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)


        # Obtener el nivel del usuario por su ID
        user_level = get_object_or_404(UserLevels, id=user_level_id)
        serializer = UserLevelsSerializer(user_level)
        
        # Devolver el nivel específico
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Actualizar un nivel de usuario 
@api_view(['PUT'])
def update_user_level(request, user_level_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Obtener el nivel del usuario por su ID
        user_level = get_object_or_404(UserLevels, id=user_level_id)

        # Validar y actualizar los datos usando el serializador
        serializer = UserLevelsSerializer(user_level, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en la base de datos
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Si los datos no son válidos, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Eliminar un nivel de usuario
@api_view(['DELETE'])
def delete_user_level(request, user_level_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Obtener el nivel del usuario por su ID
        user_level = get_object_or_404(UserLevels, id=user_level_id)
        
        # Eliminar el registro
        user_level.delete()
        
        return Response({"message": "User level deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
