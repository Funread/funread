from rest_framework import serializers
from Users.serializers import UserSerializer
from .models import BooksPerClasses

class BooksPerClassesSerializer(serializers.ModelSerializer):

  class Meta:
    model = BooksPerClasses
    fields = '__all__'

  def create(self, validated_data):
      return BooksPerClasses.objects.create(**validated_data)

  # def update(self, instance, validated_data):
  #     instance.bookId = validated_data.get('bookId', instance.bookId)
  #     instance.classesId = validated_data.get('classesId', instance.classesId)
  #     instance.save()
  #     return instance