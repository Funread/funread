from rest_framework import serializers
from .models import ClassesLog

class ClassesLogSerializer (serializers.ModelSerializer):
    class Meta:
        model = ClassesLog
        fields = '__all__'

    def create(self, validated_data):
        return ClassesLog.objects.create(**validated_data)
    
    def update(self, instance , validated_data):
        instance.classesLogid = validated_data.get('classeslogid', instance.classeslogid)
        instance.classesid = validated_data.get('classesid', instance.classesid)
        instance.userId = validated_data.get('userid', instance.userid)
        instance.createat = validated_data.get('createat', instance.createat)
        instance.description = validated_data.get('description', instance.description).lower()
        instance.save()
        return instance

        