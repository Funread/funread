from Tags.models import Tags
from rest_framework import viewsets,permissions
from .serializer import TagsSerializer

class TagsViewSet(viewsets.ModelViewSet):
  queryset = Tags.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = TagsSerializer