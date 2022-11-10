from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import SharedBooks

class SharedBooksSerializer(serializers.ModelSerializer):

  class Meta:
    model = SharedBooks
    fields = '__all__'

  def create(self, validated_data):
      return SharedBooks.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.idbook = validated_data.get('idbook', instance.idbook)
      instance.iduser = validated_data.get('iduser', instance.iduser)
      instance.save()
      return instance
