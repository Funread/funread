from dataclasses import fields
from statistics import mode
from rest_framework import serializers
from .models import Tags

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'
    
    def create(self, validated_data):
         return Tags.objects.create(**validated_data)

    def update(self, instance , validated_data):
         instance.description = validated_data.get('description' , instance.description)
         instance.descriptionn = validated_data.get('descriptionn' , instance.descriptionn)
         instance.save()
         return instance
