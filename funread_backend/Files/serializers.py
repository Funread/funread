from rest_framework import serializers
from drf_extra_fields.fields import Base64FileField
from Users.serializers import UserSerializer
from .models import File

class FileSerializer(serializers.ModelSerializer):

  class Meta:
    model = File
    fields = '__all__'

  def create(self, validated_data):
      return File.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.namefile = validated_data.get('namefile', instance.namefile).lower()
      instance.filelocation = validated_data.get('filelocation', instance.filelocation)
      instance.idfolder = validated_data.get('idfolder', instance.idfolder)
      instance.uploadby = validated_data.get('uploadby', instance.uploadby)
      instance.idtags = validated_data.get('idtags', instance.idtags)
      instance.save()
      return instance

class FileUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = File
    fields = ['namefile','filelocation','idfolder','uploadby','idtags']

  def update(self, instance, validated_data):
      instance.namefile = validated_data.get('namefile', instance.namefile)
      instance.filelocation = validated_data.get('filelocation', instance.filelocation)
      instance.idfolder = validated_data.get('idfolder', instance.idfolder)
      instance.uploadby = validated_data.get('uploadby', instance.uploadby)
      instance.idtags = validated_data.get('idtags', instance.idtags)
      instance.save()
      return instance

class FileSerializerFile(serializers.ModelSerializer):
    filelocation = Base64FileField(required=False)
    
    class Meta:
        model = File
        fields = ['namefile','filelocation','idfolder','uploadby','idtags']