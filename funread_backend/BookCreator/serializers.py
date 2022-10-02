from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = '__all__'
  def create(self, validated_data):
      return Book.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.save()
      return instance

class BookUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = ['title','category','portrait','updatedBy','updatedAt']

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.save()
      return instance

class bookStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['state']

    def update(self, instance, validated_data):
        instance.actived = validated_data.get('state', instance.actived)
        instance.save()
        return instance
