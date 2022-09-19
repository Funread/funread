from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    read_only_fields = ('createdat',)
  
  def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.userid = validated_data.get('userid', instance.userid)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance