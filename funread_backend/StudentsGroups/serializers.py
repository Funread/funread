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
      instance.userid = validated_data.get('userid', instance.userid)
      instance.isteacher = validated_data.get('isteacher', instance.isteacher)
      instance.createdby = validated_data.get('createdby', instance.createdby)
      instance.groupscreateid=validated_data.get('groupscreateid',instance.groupscreateid)
      instance.save()
      return instance