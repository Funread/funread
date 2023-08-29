from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'
    
    def create(self, validated_data):
        return Classes.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.classesid = validated_data.get('classesid' , instance.classesid)
        instance.name = validated_data.get('name' , instance.name)
        instance.grade = validated_data.get('grade' , instance.grade)
        instance.teacherassigned = validated_data.get('teacherassigned' , instance.teacherassigned)
        instance.createdat = validated_data.get('createdat' , instance.createdat)
        instance.lastupdateat = validated_data.get('lastupdateat' , instance.lastupdateat)
        instance.save()
        return instance 