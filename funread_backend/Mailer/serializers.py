from rest_framework import serializers
from .models import Mail

class MailSerializer (serializers.ModelSerializer):
    class Meta:
        model = Mail
        fields= ['emailTo','emailFrom','emailSubject','bodyMessage']
    
    def create(self, validated_data):
        return Mail.objects.create(**validated_data)