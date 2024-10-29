from rest_framework import serializers
from .models import Badge


class BadgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Badge
        fields = '__all__'

    def create(self, validated_data):
      return Badge.objects.create(**validated_data)