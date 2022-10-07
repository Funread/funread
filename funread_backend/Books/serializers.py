from rest_framework import serializers

from Users.serializers import UserSerializer
from .models import Book

class BookSerializer(serializers.ModelSerializer):

  class Meta:
    model = Book
    fields = '__all__'
    

  def create(self, validated_data):
      return Book.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.category = validated_data.get('category', instance.category)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.createdBy = validated_data.get('createdby', instance.updatedBy)
      instance.updatedAt = validated_data.get('createdAt', instance.updatedAt)
      instance.updatedBy = validated_data.get('updatedby_id', instance.updatedBy)
      instance.updatedAt = validated_data.get('updatedAt', instance.updatedAt)
      instance.state = validated_data.get('state', instance.state)
      instance.sharedBook = validated_data.get('sharedBook', instance.sharedBook)
      instance.save()
      return instance

class BookUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = ['title','category','portrait','updatedBy','updatedAt']

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.category = validated_data.get('category', instance.category)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.updatedBy = validated_data.get('updatedBy', instance.updatedBy)
      instance.updatedAt = validated_data.get('updatedAt', instance.updatedAt)
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
