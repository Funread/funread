from Institute.models import Institute, InstituteMembers
from rest_framework import viewsets, permissions
from .serializers import InstituteSerializer, InstituteMembersSerializer

class InstituteViewSet(viewsets.ModelViewSet):
  queryset = InstituteSerializer.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = InstituteSerializer

class InstituteMembersViewSet(viewsets.ModelViewSet):
  queryset = InstituteMembersSerializer.objects.all()
  permission_classes = [permissions.AllowAny]
  serializer_class = InstituteMembersSerializer