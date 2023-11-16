from rest_framework import serializers
from .models import Subtitled

class SubtitledSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Subtitled
        fields = '__all__'

        def create(self, validated_data):
            return Subtitled.objects.create(**validated_data)