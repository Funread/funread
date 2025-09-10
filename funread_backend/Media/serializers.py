from rest_framework import serializers
from .models import Media

class MediaSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

    def create(self, validated_data):
        return Media.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.extension = validated_data.get('extension', instance.extension)
        instance.file = validated_data.get('file', instance.file)
        instance.type = validated_data.get('type', instance.type)
        instance.galleryType = validated_data.get('galleryType', instance.galleryType)
        instance.save()
        return instance