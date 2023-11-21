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
      instance.studentsgroupsid = validated_data.get('studentsgroupsid', instance.studentsgroupsid)
      instance.classesid = validated_data.get('classesid', instance.classesid)
      instance.save()
      return instance