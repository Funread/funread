from dataclasses import fields
from statistics import mode
from rest_framework import serializers
from .models import Folder
from  Users.serializers import UserSerializer

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'
    
    def create(self, validated_data):
        return Folder.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.namefolders = validated_data.get('namefolders' , instance.namefolders).lower()
        instance.createdBy = validated_data.get('createdBy' , instance.createdBy)
        instance.save()
        return instance



class FolderUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = Folder
    fields = ['nameFolders']

  def update(self, instance, validated_data):
      instance.nameFolders = validated_data.get('nameFolders', instance.nameFolders)
      instance.save()
      return instance