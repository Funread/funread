# your_app/serializers.py
from rest_framework import serializers

class GrammarPromptSerializer(serializers.Serializer):
    prompt = serializers.CharField()
