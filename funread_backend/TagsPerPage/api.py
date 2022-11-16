from .models import TagsPerPage
from rest_framework import viewsets, permissions
from .serializers import TagsPerPageSerializer

class TagsPerPageViewSet(viewsets.ModelViewSet):
  queryset = TagsPerPage.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = TagsPerPageSerializer