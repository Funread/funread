from rest_framework import serializers
from .models import Media

class MediaSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

        def create(self, validated_data):
            return Media.objects.create(**validated_data)