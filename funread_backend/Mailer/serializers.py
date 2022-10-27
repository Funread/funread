from rest_framework import serializers
from .models import Mail, MailControl

class MailSerializer (serializers.ModelSerializer):
    class Meta:
        model = Mail
        fields= ['emailTo','emailFrom','emailSubject','bodyMessage']
    
    def create(self, validated_data):
        return Mail.objects.create(**validated_data)

class MailControlSerializer (serializers.ModelSerializer):
    class Meta:
        model = MailControl
        fields= ['idControl','date','category','status']
    
    def create(self, validated_data):
        return MailControl.objects.create(**validated_data)