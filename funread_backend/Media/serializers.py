from rest_framework import serializers
from .models import Media

class MediaSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

        def create(self, validated_data):
            return Media.objects.create(**validated_data)
        
        def update(self, instance , validated_data):
            instance.name = validated_data.get('name', instance.name)
            instance.extension = validated_data.get('extension', instance.extension)
            instance.image = validated_data.get('image', instance.image)
            instance.save()
            return instance