from rest_framework import serializers
from .models import UserBadge


class UserBadgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserBadge
        fields = '__all__'

    def create(self, validated_data):
      return UserBadge.objects.create(**validated_data)