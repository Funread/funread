from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'
    
    def create(self, validated_data):
        return Classes.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.name = validated_data.get('name' , instance.name)
        instance.grade = validated_data.get('grade' , instance.grade)
        instance.teacherAssigned = validated_data.get('teacherAssigned' , instance.teacherAssigned)
        instance.lastupdateAt = validated_data.get('lastupdateAt' , instance.lastupdateAt)
        instance.save()
        return instance 