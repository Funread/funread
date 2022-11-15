from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import StudentsGroups

class StudentsGroupsSerializer(serializers.ModelSerializer):

  class Meta:
    model = StudentsGroups
    fields = '__all__'

  def create(self, validated_data):
      return StudentsGroups.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.userId = validated_data.get('userId', instance.userId)
      instance.isTeacher = validated_data.get('isTeacher', instance.isTeacher)
      instance.createdBy = validated_data.get('createdBy', instance.createdBy)
      instance.save()
      return instance