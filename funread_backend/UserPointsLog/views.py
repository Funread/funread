from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import datetime
from .models import UserPointsLog
from .serializers import UserPointsLogSerializer
from User_Levels.models import UserLevels
from UserPoints.models import UserPoints
from django.db.models import Sum
from UserPoints.views import create_user_total_points
import verifyJwt 
# Puntos por completar un libro
@api_view(['POST'])
def award_points_for_reading(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user_id = request.data.get('user')
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si existe un registro de UserPoints para el usuario
        user_points, created = UserPoints.objects.get_or_create(user_id=user_id, defaults={'total_points': 0})

        # Preparar los datos para el serializador
        data = {
            'points': 100,
            'reason': 'Completed a book',
            'date': datetime.date.today(),  # Usar timezone.now para manejar fechas
            'user': user_id
        }

        # Serializar los datos
        serializer = UserPointsLogSerializer(data=data)

        # Validar los datos
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Actualizar los puntos totales del usuario
        user_points.total_points += data['points']
        user_points.save()
         
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Puntos por crear un libro
@api_view(['POST'])
def award_points_for_creating_book(request):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)

        user_id = request.data.get('user')
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si existe un registro de UserPoints para el usuario
        user_points, created = UserPoints.objects.get_or_create(user_id=user_id, defaults={'total_points': 0})

        # Preparar los datos para el serializador
        data = {
            'points': 200,  # Asignar 200 puntos por crear un libro
            'reason': 'Created a book',
            'date': datetime.date.today(),
            'user': user_id
        }

        # Serializar los datos
        serializer = UserPointsLogSerializer(data=data)

        # Validar los datos
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Actualizar los puntos totales del usuario
        user_points.total_points += data['points']
        user_points.save()
        
        serializer.save()  # Guardar el registro de puntos
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
#Consultar puntos por id de Usuario

@api_view(['GET'])
def get_user_points(request, user_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user_points_logs = UserPointsLog.objects.filter(user=user_id)
        if not user_points_logs.exists():
            return Response({"message": "No points found for this user"}, status=status.HTTP_404_NOT_FOUND)

        total_points = sum(log.points for log in user_points_logs)
        serializer = UserPointsLogSerializer(user_points_logs, many=True)

        return Response({
            "total_points": total_points,
            "points_logs": serializer.data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Editar puntos de usuario
@api_view(['PUT'])
def edit_user_points(request, log_id):
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Buscar el registro de puntos usando log_id
        user_points_log = get_object_or_404(UserPointsLog, id=log_id)

        # Actualizar los puntos con los datos enviados en la solicitud
        user_points_log.points = request.data.get('points', user_points_log.points)
        user_points_log.reason = request.data.get('reason', user_points_log.reason)
        user_points_log.save()

        # Serializar y devolver el registro actualizado
        serializer = UserPointsLogSerializer(user_points_log)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {e}")  # Imprimir el error en la consola
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



   
