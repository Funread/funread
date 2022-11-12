from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import AuthorList

class AuthorListserializer(serializers.ModelSerializer):

  class Meta:
    model = AuthorList
    fields = '__all__'

  def create(self, validated_data):
      return AuthorList.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.iduser = validated_data.get('iduser', instance.iduser)
      instance.idbook = validated_data.get('idbook', instance.idbook)
      instance.save()
      return instance

