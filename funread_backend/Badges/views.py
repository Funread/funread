from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Badge
from .serializers import BadgeSerializer
import verifyJwt



#Crear una nueva insignia
@api_view(['POST'])
def create_badge(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Validar los datos de la solicitud usando el serializador
        serializer = BadgeSerializer(data=request.data)
        
        # Verificar si los datos son válidos
        if serializer.is_valid():
            serializer.save()  # Guardar la nueva insignia en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Si los datos no son válidos, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#listar todas las insignias disponibles

@api_view(['GET'])
def list_badges(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener todas las insignias de la tabla Badge
        badges = Badge.objects.all()
        
        # Serializar las insignias
        serializer = BadgeSerializer(badges, many=True)
        
        # Devolver la lista de insignias
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Editar una insignia

@api_view(['PUT'])
def update_badge(request, badge_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener la insignia especificada por su ID
        badge = get_object_or_404(Badge, id=badge_id)

        # Validar y actualizar los datos de la insignia usando el serializador
        serializer = BadgeSerializer(badge, data=request.data, partial=True)
        
        # Verificar si los datos son válidos
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en la base de datos
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Si los datos no son válidos, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#Eliminar una insignia

@api_view(['DELETE'])
def delete_badge(request, badge_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener la insignia especificada por su ID
        badge = get_object_or_404(Badge, id=badge_id)
        
        # Eliminar la insignia
        badge.delete()
        
        # Responder con un mensaje de éxito
        return Response({"message": "Badge deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
