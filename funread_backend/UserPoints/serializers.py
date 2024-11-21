from rest_framework import serializers
from .models import UserPoints


class UserPointsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPoints
        fields = '__all__'

    def create(self, validated_data):
      return UserPoints.objects.create(**validated_data)