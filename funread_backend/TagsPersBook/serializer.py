from rest_framework import serializers
from .models import TagsPerBook

class TagsPerBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagsPerBook
        fields = '__all__'
    
    def create(self, validated_data):
        return TagsPerBook.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.bookid = validated_data.get('bookid' , instance.bookid)
        instance.tagsid = validated_data.get('tagsid' , instance.tagsid)
        instance.save()
        return instance 