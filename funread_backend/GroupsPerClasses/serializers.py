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
      instance.studentsgroups_id = validated_data.get('studentsgroups_id', instance.studentsgroups_id)
      instance.classes_id = validated_data.get('classes_id', instance.classes_id)
      instance.save()
      return instance