from Pages.models import Pages
from rest_framework import viewsets, permissions
from .serializers import PageSerializer

class PageViewSet(viewsets.ModelViewSet):
  queryset = Pages.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = PageSerializer