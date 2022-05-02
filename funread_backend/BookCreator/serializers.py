from rest_framework import serializers
from BookCreator.models import BookCreator, Page, Content


class ContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Content
    fields = ("order", "imgUrl", "text",)

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

  def create(self, validated_data):
    pages_data = validated_data.pop("pages")
    book = BookCreator.objects.create(**validated_data)
    for page in pages_data:
      print(page)


      contents_data = page.pop("contentsList")
      
      instance = Page.objects.create(**page)
      for contentData in contents_data:
        instance.contentsData.add(contentData)
    

      for content in contents_data:
        print(content)
        Content.objects.create(page=page, **content)
