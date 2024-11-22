from rest_framework import serializers
from .models import AudioTranscription

class AudioTranscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioTranscription
        fields = '__all__'
