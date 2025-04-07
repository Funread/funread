from rest_framework import serializers
from .models import UserBookProgress

class UserBookProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBookProgress
        fields = '__all__'
