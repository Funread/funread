from .models import BooksPerClasses
from rest_framework import viewsets, permissions
from .serializers import BooksPerClassesSerializer

class BooksPerClassesViewSet(viewsets.ModelViewSet):
  queryset = BooksPerClasses.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = BooksPerClassesSerializer