from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import TagsPerPage

class TagsPerPageSerializer(serializers.ModelSerializer):

  class Meta:
    model = TagsPerPage
    fields = '__all__'

  def create(self, validated_data):
      return TagsPerPage.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.pageId = validated_data.get('pageId', instance.pageId)
      instance.tagsId = validated_data.get('tagsId', instance.tagsId)
      instance.save()
      return instance