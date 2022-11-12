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
      instance.idBook = validated_data.get('idBook', instance.idBook)
      instance.idUser = validated_data.get('idUser', instance.idUser)
      instance.save()
      return instance
