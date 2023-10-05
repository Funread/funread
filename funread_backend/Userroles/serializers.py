from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import Userroles 

class UserRolesSerializer(serializers.ModelSerializer):

  class Meta:
    model = Userroles
    fields = '__all__'

  def create(self, validated_data):
      return Userroles.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.iduser = validated_data.get('iduser', instance.iduser)
      instance.idrole = validated_data.get('idrole', instance.idrole)
      instance.save()
      return instance
