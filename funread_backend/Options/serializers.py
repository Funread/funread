from rest_framework import serializers
from .models import Options

class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'

        def create(self, validated_data):
            return Options.objects.create(**validated_data)