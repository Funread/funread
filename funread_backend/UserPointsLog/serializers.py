from rest_framework import serializers
from .models import UserPointsLog
from User_Levels.models import UserLevels


class UserPointsLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserLevels.objects.all())

    class Meta:
        model = UserPointsLog
        fields = '__all__'

    def create(self, validated_data):
      return UserPointsLog.objects.create(**validated_data)
    
    