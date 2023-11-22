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
      instance.bookid = validated_data.get('bookid', instance.bookid)
      instance.userid = validated_data.get('userid', instance.userid)
      instance.save()
      return instance
