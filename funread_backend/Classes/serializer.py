from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'
    
    def create(self, validated_data):
        return Classes.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.name = validated_data.get('bookid' , instance.name)
        instance.grade = validated_data.get('tagsid' , instance.grade)
        instance.createdat = validated_data.get('tagsid' , instance.createdat)
        instance.lastupdateat = validated_data.get('tagsid' , instance.lastupdateat)
        instance.save()
        return instance 