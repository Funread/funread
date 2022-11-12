from .models import Roles
from rest_framework import viewsets, permissions
from .serializers import RolesSerializer

class RolesViewSet(viewsets.ModelViewSet):
  queryset = Roles.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = RolesSerializer