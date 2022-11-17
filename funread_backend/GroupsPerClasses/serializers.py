from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import GroupsPerClasses

class GroupsPerClassesSerializer(serializers.ModelSerializer):

  class Meta:
    model = GroupsPerClasses
    fields = '__all__'

  def create(self, validated_data):
      return GroupsPerClasses.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.groupId = validated_data.get('groupId', instance.groupId)
      instance.classesId = validated_data.get('classesId', instance.classesId)
      instance.save()
      return instance