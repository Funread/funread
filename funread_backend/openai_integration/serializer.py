from rest_framework import serializers
from .models import OpenAIInteraction

class OpenAIInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenAIInteraction
        fields = '__all__'
