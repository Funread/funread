from .models import GroupsPerClasses
from rest_framework import viewsets, permissions
from .serializers import GroupsPerClassesSerializer

class GroupsPerClassesViewSet(viewsets.ModelViewSet):
  queryset = GroupsPerClasses.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = GroupsPerClassesSerializer