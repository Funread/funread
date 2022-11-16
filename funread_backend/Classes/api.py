from .models import Classes
from rest_framework import viewsets,permissions
from .serializers import ClassesSerializer

class ClassesViewSet(viewsets.ModelViewSet):
  queryset = Classes.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = ClassesSerializer