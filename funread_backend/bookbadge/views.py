from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BookBadge
from .serializers import BookBadgeSerializer

@api_view(['POST'])
def create_bookbadge(request):
    serializer = BookBadgeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_bookbadge(request):
    try:
        record = BookBadge.objects.get(id=request.data.get('id'))
        serializer = BookBadgeSerializer(record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except BookBadge.DoesNotExist:
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_bookbadge(request):
    try:
        record = BookBadge.objects.get(id=request.data.get('id'))
        record.delete()
        return Response({"message": "Registro eliminado"}, status=status.HTTP_204_NO_CONTENT)
    except BookBadge.DoesNotExist:
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)
