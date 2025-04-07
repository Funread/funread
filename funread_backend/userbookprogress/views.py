from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserBookProgress
from .serializers import UserBookProgressSerializer


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
