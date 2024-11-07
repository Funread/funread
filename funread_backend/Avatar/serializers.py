from rest_framework import serializers
from .models import Avatar

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = '__all__'  # O los campos que desees exponer
