from Files.models import File
from rest_framework import viewsets,permissions
from .serializer import FileSerializer

class FileViewSet(viewsets.ModelViewSet):
  queryset = File.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = FileSerializer