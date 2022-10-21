from Pages.models import Pages
from rest_framework import viewsets, permissions

from funread_backend.Widget.models import Widget, WidgetItem
from .serializers import WidgetSerializer,WidgetItemSerializer

class WidgetViewSet(viewsets.ModelViewSet):
  queryset = Widget.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = WidgetSerializer

class WidgetItemViewSet(viewsets.ModelViewSet):
  queryset = WidgetItem.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = WidgetItemSerializer