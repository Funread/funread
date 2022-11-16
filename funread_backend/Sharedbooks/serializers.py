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
      instance.bookId = validated_data.get('bookId', instance.bookId)
      instance.userId = validated_data.get('userId', instance.userId)
      instance.save()
      return instance
