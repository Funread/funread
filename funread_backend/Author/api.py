from .models import AuthorList
from rest_framework import viewsets, permissions
from .serializers import AuthorListserializer

class AuthorListViewSet(viewsets.ModelViewSet):
  queryset = AuthorList.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = AuthorListserializer