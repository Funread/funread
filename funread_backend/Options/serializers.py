from rest_framework import serializers
from .models import Options

class OptionsSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'

        def create(self, validated_data):
            return Options.objects.create(**validated_data)