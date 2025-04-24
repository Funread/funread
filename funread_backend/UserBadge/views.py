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
from django.db.models import OuterRef, BooleanField, Case, When, Value
from django.http import JsonResponse

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
            defaults={'date': datetime.datetime.now(), 'achieved': 1}
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
        response_data = serializer.data
        response_data['created'] = created  # Añadir el campo 'created' a la respuesta
        return Response(response_data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

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


@api_view(['GET'])
def list_user_badges_Achieved_NOT_Achieved(request, user_id):
    try:
        # Validar token JWT
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Subquery para obtener las insignias logradas por el usuario
        user_badge_subquery = UserBadge.objects.filter(
            user_id=user_id,
            badge=OuterRef('pk')
        )

        # Anotar los badges con el campo "achieved"
        all_badges = Badge.objects.annotate(
            achieved=Case(
                When(id__in=user_badge_subquery.values('badge'), then=Value(True)),
                default=Value(False),
                output_field=BooleanField()
            )
        )


        all_badges_list = [
            {
                "title": badge.title,
                "description": badge.description,
                "points": badge.points,
                "achieved": badge.achieved,
                "icon": badge.icon if badge.icon else None,
            }
            for badge in all_badges
        ]

        # Retornar la respuesta con la lista de badges
        return Response(all_badges_list, status=status.HTTP_200_OK)

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

# @api_view(['PUT'])
# def progress_badge(request):
#     try:
#         # Verificar token de autorización
#         authorization_header = request.headers.get('Authorization')
#         verify = verifyJwt.JWTValidator(authorization_header)
#         es_valido = verify.validar_token()

#         if not es_valido:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         # 🔹 Verificar qué JSON se está recibiendo
#         print("Request Data:", request.data)

#         # Asegurar que request.data no sea None
#         if not request.data:
#             return Response({"error": "No se recibió JSON válido"}, status=status.HTTP_400_BAD_REQUEST)

#         # Obtener datos de la solicitud
#         user_id = request.data.get('userid')
#         badge_id = request.data.get('badge_id')
#         progress = request.data.get('progress')

#         if user_id is None or badge_id is None or progress is None:
#             return Response({"error": "Faltan datos en la solicitud"}, status=status.HTTP_400_BAD_REQUEST)

#         # Obtener el objeto UserBadge correspondiente al usuario y la insignia
#         user_badge = get_object_or_404(UserBadge, user_id=user_id, badge_id=badge_id)
#         badge = get_object_or_404(Badge, id=badge_id)

#         # Actualizar progreso
#         user_badge.progress += progress
#         user_badge.save()

#         # Verificar si se ha alcanzado el progreso requerido
#         if user_badge.progress >= badge.progress_placeholder:
#             user_badge.achieved = True
#             user_badge.save()

#         return Response({
#             "message": "Progreso actualizado correctamente",
#             "user_id": user_id,
#             "badge_id": badge_id,
#             "progress": user_badge.progress,
#             "achieved": user_badge.achieved
#         }, status=status.HTTP_200_OK)

#     except Exception as e:
#         print(f"Error: {e}")
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
