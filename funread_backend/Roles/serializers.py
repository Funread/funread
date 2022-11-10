from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import Roles, UserRoles

class RolesSerializer(serializers.ModelSerializer):

  class Meta:
    model = Roles
    fields = '__all__'

  def create(self, validated_data):
      return Roles.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.role = validated_data.get('role', instance.role).lower()
      instance.save()
      return instance

class RolesUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = Roles
    fields = ['role']

  def update(self, instance, validated_data):
      instance.role = validated_data.get('role', instance.role)
      instance.save()
      return instance
      

class UserRolesSerializer(serializers.ModelSerializer):

  class Meta:
    model = UserRoles
    fields = '__all__'

  def create(self, validated_data):
      return UserRoles.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.idrole = validated_data.get('idrole', instance.idrole)
      instance.iduser = validated_data.get('iduser', instance.iduser)
      instance.save()
      return instance
