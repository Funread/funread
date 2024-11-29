from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime
from .models import UserPoints
from .serializers import UserPointsSerializer
from Users.models import User
from django.db.models import Sum
from UserPointsLog.models import UserPointsLog
import verifyJwt
from django.http import JsonResponse

@api_view(['POST'])
def create_user_total_points(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Verificar si ya existe un registro de puntos para el usuario
        if UserPoints.objects.filter(user_id=user_id).exists():
            return Response({"error": "User already has a points record"}, status=status.HTTP_400_BAD_REQUEST)

        # Validar que el campo total_points esté en los datos de la solicitud y no sea nulo
        if 'total_points' not in request.data or request.data['total_points'] is None:
            return Response({"error": "total_points is required and cannot be null"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el registro de puntos totales para el usuario
        user_points = UserPoints(user_id=user_id, total_points=request.data['total_points'])
        user_points.save()

        # Serializar y devolver el registro creado
        serializer = UserPointsSerializer(user_points)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Consultar puntos totales de un usuario
@api_view(['GET'])
def get_user_total_points(request, user_id):
    try:
        # Verificar el encabezado de autorización
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            return Response({"error": "Encabezado de autorización no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
        
        verify = verifyJwt.JWTValidator(authorization_header)
        if not verify.validar_token():
            return Response({"error": "Token de autenticación inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

        # Obtener el registro de UserPoints del usuario especificado
        user_points = get_object_or_404(UserPoints, user_id=user_id)

        # Serializar y devolver el registro
        serializer = UserPointsSerializer(user_points)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ValueError as ve:
        print(f"Error de valor: {ve}")
        return Response({"error": "Entrada inválida: error en el formato de datos"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Error inesperado: {e}")
        return Response({"error": "Se produjo un error inesperado. Por favor, intente nuevamente más tarde."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Actualizar puntos totales de un usuario (por ejemplo, si se requiere un ajuste manual)
@api_view(['PUT'])
def update_user_total_points_view(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener el registro de UserPoints del usuario especificado
        user_points = get_object_or_404(UserPoints, user_id=user_id)

        # Validar que el campo total_points esté en los datos de la solicitud y no sea nulo
        if 'total_points' not in request.data or request.data['total_points'] is None:
            return Response({"error": "total_points is required and cannot be null"}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar los puntos totales del usuario con el valor proporcionado en la solicitud
        user_points.total_points = request.data['total_points']
        user_points.save()

        # Serializar y devolver el registro actualizado
        serializer = UserPointsSerializer(user_points)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Eliminar el registro de puntos totales de un usuario (si es necesario)
@api_view(['DELETE'])
def delete_user_total_points(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user_points = get_object_or_404(UserPoints, user_id=user_id)
        user_points.delete()
        return Response({"message": "User total points record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    


#Obtener el Top 10 de Usuarios de cada mes
@api_view(['GET'])
def leaderboard_top_10(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)


        # Obtener el mes y año actual
        current_month = datetime.now().month
        current_year = datetime.now().year

        # Filtrar los logs de puntos por el mes y año actual y sumar los puntos por usuario
        top_users = (
            UserPointsLog.objects.filter(date__month=current_month, date__year=current_year)
            .values('user__id', 'user__username')
            .annotate(total_points=Sum('points'))
            .order_by('-total_points')[:10]  # Limitar a los 10 primeros
        )

        return Response(top_users, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#Clasificación de un Usuario

@api_view(['GET'])
def user_ranking_position(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtener el mes y año actual
        current_month = datetime.now().month
        current_year = datetime.now().year

        # Calcular el ranking de todos los usuarios
        ranking = (
            UserPointsLog.objects
            .filter(date__month=current_month, date__year=current_year)
            .values('user_id')
            .annotate(total_points=Sum('points'))
            .order_by('-total_points')
        )

        # Buscar la posición del usuario en el ranking
        user_position = None
        for index, user in enumerate(ranking, start=1):
            if user['user_id'] == user_id:
                user_position = {
                    'position': index,
                    'user_id': user['user_id'],
                    'total_points': user['total_points'],
                }
                break

        # Si el usuario no se encuentra en el ranking del mes actual
        if user_position is None:
            return Response(
                {'error': 'User not found in the ranking for the current month.'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(user_position, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Endpoint que devuelva el nivel y el total de puntos (filtro por user_id).
@api_view(['GET'])
def get_user_level_and_points(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtén el nivel del usuario desde el modelo UserLevels en la aplicación User_Levels
        user = get_object_or_404(User, id=user_id)
        level = user.level

        # Obtén el total de puntos del usuario desde la tabla UserPoints usando user_id
        user_points = get_object_or_404(UserPoints, user_id=user_id)
        total_points = user_points.total_points

        # Devuelve la respuesta en JSON
        return JsonResponse({
            "level": level,
            "total_points": total_points
        }, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({"error": "El usuario especificado no tiene un nivel registrado"}, status=status.HTTP_404_NOT_FOUND)
    
    except UserPoints.DoesNotExist:
        return Response({"error": "El usuario especificado no tiene puntos registrados"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
