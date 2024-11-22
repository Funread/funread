from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import UserBadge, Badge
from UserPoints.models import UserPoints
import datetime
from .serializers import UserBadgeSerializer
import verifyJwt


@api_view(['POST'])
def award_badge_to_user(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user_id = request.data.get('user_id')
        badge_id = request.data.get('badge_id')

        if not user_id or not badge_id:
            return Response({"error": "user_id and badge_id are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario ya tiene esta insignia
        user_badge, created = UserBadge.objects.get_or_create(
            user_id=user_id, badge_id=badge_id,
            defaults={'date': datetime.datetime.now()}
        )

        # Solo sumar puntos si es una nueva insignia
        if created:
            badge = get_object_or_404(Badge, id=badge_id)
            user_points, _ = UserPoints.objects.get_or_create(
                user_id=user_id,
                defaults={'total_points': 0}  # Proporciona un valor inicial de 0
            )
            user_points.total_points += badge.points
            user_points.save()

        # Serializar y devolver el registro de UserBadge
        serializer = UserBadgeSerializer(user_badge)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Lista de insignias de usuarios

@api_view(['GET'])
def list_user_badges(request, user_id):
    try:

        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Filtrar las insignias de un usuario específico
        user_badges = UserBadge.objects.filter(user_id=user_id)
        
        # Serializar los datos de las insignias o devolver un array vacío si no hay resultados
        serializer = UserBadgeSerializer(user_badges, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['DELETE'])
def delete_user_badge(request, user_badge_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar la insignia del usuario por su ID
        user_badge = UserBadge.objects.filter(id=user_badge_id).first()
        
        # Verificar si el user_badge existe
        if not user_badge:
            return Response({"message": "UserBadge with the given ID does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Eliminar la insignia
        user_badge.delete()
        
        return Response({"message": "Badge removed successfully"}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

