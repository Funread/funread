from rest_framework import serializers
from rest_framework import mixins, generics
from BookCreator.models import BookCreator, Page, Content


class ContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Content
    fields = ("order", "dataType", "value",)

class PageSerializer(serializers.ModelSerializer):
  contentsList = ContentSerializer(many=True)

  class Meta:
    model = Page
    fields = ("pageNumber", "contentsList",)


class BookCreatorSerializer(serializers.ModelSerializer):
  pages = PageSerializer(many=True)

  class Meta:
    model = BookCreator
    fields = ("id", "name", "description", "type", "pages", "teacherId")
