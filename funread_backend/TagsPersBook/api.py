from .models import TagsPerBook
from rest_framework import viewsets,permissions
from .serializer import TagsPerBookSerializer

class TagsPersBookViewSet(viewsets.ModelViewSet):
  queryset = TagsPerBook.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = TagsPerBookSerializer


