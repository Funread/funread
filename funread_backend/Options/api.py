from Options.models import Options
from rest_framework import viewsets, permissions
from .serializers import OptionsSerializer

class OptionsViewSet(viewsets.ModelViewSet):
  queryset = Options.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = OptionsSerializer