from rest_framework import serializers
from .models import UserLevels


class UserLevelsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLevels
        fields = '__all__'

    def create(self, validated_data):
      return UserLevels.objects.create(**validated_data)