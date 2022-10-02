from BookCreator.models import Book
from rest_framework import viewsets, permissions
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
  queryset = Book.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = BookSerializer