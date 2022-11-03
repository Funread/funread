from .models import Mail
from rest_framework import viewsets, permissions
from .serializers import MailSerializer

class MailViewSet(viewsets.ModelViewSet):
  queryset = Mail.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = MailSerializer