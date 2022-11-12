
from .models import SharedBooks
from rest_framework import viewsets, permissions
from .serializers import SharedBooksSerializer

class SharedBooksViewSet(viewsets.ModelViewSet):
  queryset = SharedBooks.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = SharedBooksSerializer