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
      instance.groupsId = validated_data.get('groupsId', instance.groupsId)
      instance.classesId = validated_data.get('classesId', instance.classesId)
      instance.save()
      return instance