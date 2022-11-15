from .models import StudentsGroups
from rest_framework import viewsets, permissions
from .serializers import StudentsGroupsSerializer

class StudentsGroupsViewSet(viewsets.ModelViewSet):
  queryset = StudentsGroups.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = StudentsGroupsSerializer