from folder.models import Folder
from rest_framework import viewsets,permissions
from .serializer import FolderSerializer

class FolderViewSet(viewsets.ModelViewSet):
  queryset = Folder.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = FolderSerializer