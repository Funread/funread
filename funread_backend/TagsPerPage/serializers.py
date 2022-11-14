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
      instance.pageID = validated_data.get('PageID', instance.PageID)
      instance.tagsID = validated_data.get('TagsID', instance.TagsID)
      instance.save()
      return instance