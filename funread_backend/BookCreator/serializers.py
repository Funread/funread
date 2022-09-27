from rest_framework import serializers
from rest_framework import mixins, generics
from BookCreator.models import Book


class BookSerializer(serializers.ModelSerializer):
 

  class Meta:
    model = Book
    fields = '__all__'
  def create(self, validated_data):
      return Book.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.title = validated_data.get('name', instance.name)
      instance.email = validated_data.get('email', instance.email)
      instance.portrait = validated_data.get('lastname', instance.lastname)
      instance.save()
      return instance