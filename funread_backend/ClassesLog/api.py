from .models import ClassesLog
from rest_framework import viewsets,permissions
from .serializers import ClassesLogSerializer

class ClassesLogViewSet(viewsets.ModelViewSet):
  queryset = ClassesLog.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = ClassesLogSerializer
