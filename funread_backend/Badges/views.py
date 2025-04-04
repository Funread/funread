from django.forms import CharField
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Badge
from .serializers import BadgeSerializer
import verifyJwt
from .models import Badge
from UserBadge.models import UserBadge
from django.db.models import OuterRef, Subquery, BooleanField, Case, When, Value, IntegerField, CharField
from django.http import JsonResponse


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
        if not serializer.is_valid():
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()  # Guardar la nueva insignia en la base de datos
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        if not serializer.is_valid():
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()  # Guardar la nueva insignia en la base de datos
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
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



@api_view(['GET'])
def list_user_badges_with_status(request, user_id):
    try:
        # Validar token JWT
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Subquery para obtener el progreso y si la insignia está lograda
        user_badge_subquery = UserBadge.objects.filter(
            user_id=user_id,
            badge=OuterRef('pk')
        )

        # Anotamos los campos necesarios: logrado, progreso y estado
        badges = Badge.objects.filter(
            id__in=user_badge_subquery.values('badge')
        ).annotate(
            achieved=Case(
                When(id__in=user_badge_subquery.values('badge'), then=Value(True)),
                default=Value(False),
                output_field=BooleanField()
            ),
            progress=Subquery(
                user_badge_subquery.values('progress')[:1],
                output_field=IntegerField()
            ),
            status=Case(
                When(id__in=user_badge_subquery.values('badge'), then=Value("Done")),
                When(progress__gt=0, then=Value("In Progress")),
                default=Value("Not Done"),
                output_field=CharField()
            )
        )

        # Construimos la lista con el formato requerido
        badge_list = [
            {
                "title": badge.title,
                "description": badge.description,
                "points": badge.points,
                "show_progress": badge.show_progress,
                "progress_placeholder": badge.progress_placeholder if badge.show_progress else None,
                "achieved": badge.achieved,
                "progress": badge.progress if badge.progress is not None else 0,
                "status": badge.status,
            }
            for badge in badges
        ]

        return JsonResponse({"badges": badge_list}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# @api_view(['GET'])
# def list_user_badges_Achieved_NOT_Achieved(request, user_id):
#     try:
#         # Validar token JWT
#         authorization_header = request.headers.get('Authorization')
#         verify = verifyJwt.JWTValidator(authorization_header)
#         es_valido = verify.validar_token()
#         if not es_valido:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         # Subquery para obtener el progreso y si la insignia está lograda
#         user_badge_subquery = UserBadge.objects.filter(
#             user_id=user_id,
#             badge=OuterRef('pk')
#         )

#         # Anotamos los campos necesarios: logrado, progreso y estado
#         all_badges = Badge.objects.annotate(
#             achieved=Case(
#                 When(id__in=user_badge_subquery.values('badge'), then=Value(True)),
#                 default=Value(False),
#                 output_field=BooleanField()
#             ),
#             progress=Subquery(
#                 user_badge_subquery.values('progress')[:1],
#                 output_field=IntegerField()
#             ),
#             status=Case(
#                 When(id__in=user_badge_subquery.values('badge'), then=Value("Done")),
#                 When(progress__gt=0, then=Value("In Progress")),
#                 default=Value("Not Done"),
#                 output_field=CharField()
#             )
#         )

#         # Separar las badges logradas y no logradas
#         achieved_badges = all_badges.filter(achieved=True)
#         unachieved_badges = all_badges.filter(achieved=False)

#         # Construir listas para cada categoría
#         achieved_list = [
#             {
#                 "title": badge.title,
#                 "description": badge.description,
#                 "points": badge.points,
#                 "show_progress": badge.show_progress,
#                 "progress_placeholder": badge.progress_placeholder if badge.show_progress else None,
#                 "achieved": badge.achieved,
#                 "progress": badge.progress if badge.progress is not None else 0,
#                 "status": badge.status,
#             }
#             for badge in achieved_badges
#         ]

#         unachieved_list = [
#             {
#                 "title": badge.title,
#                 "description": badge.description,
#                 "points": badge.points,
#                 "show_progress": badge.show_progress,
#                 "progress_placeholder": badge.progress_placeholder if badge.show_progress else None,
#                 "achieved": badge.achieved,
#                 "progress": 0,  # Las no logradas no tienen progreso
#                 "status": "Not Done",
#             }
#             for badge in unachieved_badges
#         ]

#         # Retornar la respuesta con ambas listas
#         return JsonResponse(
#             {"achieved_badges": achieved_list, "unachieved_badges": unachieved_list},
#             status=status.HTTP_200_OK
#         )

#     except Exception as e:
#         print(f"Error: {e}")
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)