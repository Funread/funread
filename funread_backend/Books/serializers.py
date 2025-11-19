from rest_framework import serializers

from Users.serializers import UserSerializer
from .models import Book

class BookSerializer(serializers.ModelSerializer):
  author = serializers.SerializerMethodField()

  class Meta:
    model = Book
    fields = '__all__'

  def get_author(self, obj):
    if obj.createdby:
      full_name = f"{obj.createdby.name or ''} {obj.createdby.lastname or ''}".strip()
      return full_name if full_name else obj.createdby.username
    return None

  def create(self, validated_data):
      return Book.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.category = validated_data.get('category', instance.category)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.lastupdateat = validated_data.get('lastupdateat', instance.lastupdateat)
      instance.state = validated_data.get('state', instance.state)
      instance.sharedbook = validated_data.get('sharedbook', instance.sharedbook)
      instance.lastupdateby = validated_data.get('lastupdateby', instance.lastupdateby)
      instance.description=validated_data.get('description',instance.description)
      instance.save()
      return instance

class BookUpdatedBySerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = ['title','category','portrait','updatedby','lastupdateat', 'description']

  def update(self, instance, validated_data):
      instance.title = validated_data.get('title', instance.title)
      instance.category = validated_data.get('category', instance.category)
      instance.portrait = validated_data.get('portrait', instance.portrait)
      instance.lastupdatedby = validated_data.get('lastupdatedby', instance.lastupdatedby)
      instance.lastupdateat = validated_data.get('lastupdateat', instance.lastupdateat)
      instance.description = validated_data.get('description',instance.description)
      instance.save()
      return instance

class bookStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['sharedbook']

    def update(self, instance, validated_data):
        instance.sharedbook = validated_data.get('sharedbook', instance.sharedbook)
        instance.save()
        return instance
