from rest_framework import serializers
from Books.serializers import BookSerializer

from Users.serializers import UserSerializer
from .models import BookCategory,BookDimension,BookDilemma,DilemmaPerBook

class BookCategorySerializer(serializers.ModelSerializer):
  
  class Meta:
    model = BookCategory
    fields = '__all__'

  def create(self, validated_data):
      return BookCategory.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.name = validated_data.get('name', instance.name)
      instance.save()
      return instance

class BookDimensionSerializer(serializers.ModelSerializer):

  class Meta:
    model = BookDimension
    fields = '__all__'

  def create(self, validated_data):
      return BookDimension.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.name = validated_data.get('name', instance.name)
      instance.bookcategoryid = validated_data.get('bookcategoryid', instance.bookcategoryid)
      instance.save()
      return instance

class BookDilemmaSerializer(serializers.ModelSerializer):

  class Meta:
    model = BookDilemma
    fields = '__all__'

  def create(self, validated_data):
      return BookDilemma.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.dilemma = validated_data.get('dilemma', instance.dilemma)
      instance.bookdimensionid = validated_data.get('bookdimensionid', instance.bookdimensionid)
      instance.save()
      return instance
  
class DilemmaPerBookSerializer(serializers.ModelSerializer):
  bookid = BookSerializer()
  
  class Meta:
    model = DilemmaPerBook
    fields = '__all__'

  def create(self, validated_data):
      return DilemmaPerBook.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.bookdilemmaid = validated_data.get('bookdilemmaid', instance.bookdilemmaid)
      instance.bookid = validated_data.get('bookid', instance.bookid)
      instance.save()
      return instance
