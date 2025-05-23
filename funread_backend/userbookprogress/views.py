from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserBookProgress
from .serializers import UserBookProgressSerializer
from django.db.models import Count


@api_view(['POST'])
def create_progress(request):
    serializer = UserBookProgressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_status(request):
    try:
        record = UserBookProgress.objects.get(id=request.data.get('id'))
        record.status = request.data.get('status')
        record.save()
        serializer = UserBookProgressSerializer(record)
        return Response(serializer.data)
    except UserBookProgress.DoesNotExist:
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_calificacion(request):
    try:
        record = UserBookProgress.objects.get(id=request.data.get('id'))
        if record.status == 1:
            return Response({"error": "No se puede modificar si el estado es completado"}, status=status.HTTP_400_BAD_REQUEST)
        record.calificacion = request.data.get('calificacion')
        record.save()
        return Response(UserBookProgressSerializer(record).data)
    except UserBookProgress.DoesNotExist:
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_progress(request):
    try:
        record = UserBookProgress.objects.get(id=request.data.get('id'))
        record.delete()
        return Response({"message": "Registro eliminado"}, status=status.HTTP_204_NO_CONTENT)
    except UserBookProgress.DoesNotExist:
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def get_or_create_progress(request):
    user_id = request.data.get('userId')
    book_id = request.data.get('bookId')

    if not user_id or not book_id:
        return Response({"error": "Faltan userId o bookId"}, status=status.HTTP_400_BAD_REQUEST)

    progress, created = UserBookProgress.objects.get_or_create(
        user_id=user_id,
        book_id=book_id,
        defaults={'status': 0, 'calificacion': None}
    )

    serializer = UserBookProgressSerializer(progress)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(['POST'])
def mark_as_completed(request):
    """
    Marca un libro como completado con calificación 100.
    Requiere userId y bookId en el cuerpo de la solicitud.
    """
    user_id = request.data.get('userId')
    book_id = request.data.get('bookId')

    if not user_id or not book_id:
        return Response({"error": "Faltan userId o bookId"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Intenta encontrar el registro existente
        progress = UserBookProgress.objects.get(user_id=user_id, book_id=book_id)
        # Actualiza el registro con estado completado y calificación 100
        progress.status = 1  # 1 = Completado según STATUS_CHOICES
        progress.calificacion = 100.0
        progress.save()
    except UserBookProgress.DoesNotExist:
        # Si no existe, crea un nuevo registro
        progress = UserBookProgress.objects.create(
            user_id=user_id,
            book_id=book_id,
            status=1,  # Completado
            calificacion=100.0
        )

    serializer = UserBookProgressSerializer(progress)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_progress(request, user_id, book_id):
    """
    Obtiene el progreso de un libro específico para un usuario.
    Requiere userId y bookId como parámetros de URL.
    """
    try:
        progress = UserBookProgress.objects.get(user_id=user_id, book_id=book_id)
        serializer = UserBookProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserBookProgress.DoesNotExist:
        return Response(
            {"error": "No se encontró progreso para este usuario y libro", "exists": False}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def books_completed(request, user_id):
    """
    Obtiene la cantidad total de libros completados por un usuario.
    Requiere user_id como parámetro de URL.
    """
    try:
        # Contar registros donde user_id coincida y status sea 1 (completado)
        completed_count = UserBookProgress.objects.filter(
            user_id=user_id,
            status=1  # 1 = Completado según STATUS_CHOICES
        ).count()
        
        return Response({
            "user_id": user_id,
            "completed_books": completed_count
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"error": f"Error al obtener libros completados: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

