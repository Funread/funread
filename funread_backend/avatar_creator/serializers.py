# avatar_creator/serializers.py

from rest_framework import serializers

class AvatarSerializer(serializers.Serializer):
    skin_color = serializers.CharField()
    hair_style = serializers.CharField()
    accessories = serializers.ListField(child=serializers.CharField())