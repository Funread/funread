from .models import Grades
from rest_framework import viewsets, permissions
from .serializers import GradeSerializer

class GradeViewSet(viewsets.ModelViewSet):
  queryset = Grades.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = GradeSerializer
