from rest_framework import serializers
from Users.serializers import UserSerializer
from Tags.serializer import TagsSerializer
from folder.serializer import FolderSerializer
from .models import File

class FileSerializer(serializers.ModelSerializer):

  class Meta:
    model = File
    fields = '__all__'

  def create(self, validated_data):
      return File.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.nameFile = validated_data.get('nameFile', instance.nameFile)
      instance.fileLocation = validated_data.get('fileLocation', instance.fileLocation)
      instance.IdFolder = validated_data.get('IdFolder', instance.IdFolder)
      instance.uploadBy = validated_data.get('uploadBy', instance.uploadBy)
      instance.IdTags = validated_data.get('IdTags', instance.IdTags)
      instance.save()
      return instance

class FileUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = File
    fields = ['nameFile','fileLocation','IdFolder','uploadBy','IdTags']

  def update(self, instance, validated_data):
      instance.nameFile = validated_data.get('nameFile', instance.nameFile)
      instance.fileLocation = validated_data.get('fileLocation', instance.fileLocation)
      instance.IdFolder = validated_data.get('IdFolder', instance.IdFolder)
      instance.uploadBy = validated_data.get('uploadBy', instance.uploadBy)
      instance.IdTags = validated_data.get('IdTags', instance.IdTags)
      instance.save()
      return instance