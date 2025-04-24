from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import BookBadge, Badge
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
        return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND) # Asegúrate de importar el modelo Badge

@api_view(['GET'])
def get_badges_per_book(request):
    try:
        book_id = request.query_params.get('book_id')  # Usar query_params para métodos GET
        if not book_id:
            return Response({"error": "El parámetro 'book_id' es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener los registros de BookBadge que coincidan con el book_id
        book_badges = BookBadge.objects.filter(book_id=book_id)

        # Obtener los badge_ids de los registros encontrados
        badge_ids = book_badges.values_list('badge_id', flat=True)

        # Obtener la información de los badges correspondientes
        badges = Badge.objects.filter(id__in=badge_ids)

        # Serializar la información de los badges
        badges_data = [
            {
                "id": badge.id,
                "name": badge.title, 
                "description": badge.description,
                "points": badge.points,
                "icon": badge.icon if badge.icon else None,
            }
            for badge in badges
        ]

        return Response(badges_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)