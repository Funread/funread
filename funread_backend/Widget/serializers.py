from rest_framework import serializers

from Books.serializers import BookSerializer
from .models import Widget, WidgetItem

class WidgetSerializer(serializers.ModelSerializer):

  class Meta:
    model = Widget
    fields = '__all__'

  def create(self, validated_data):
      return Widget.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.widgetid = validated_data.get('widgetid', instance.widgetid)
      instance.type = validated_data.get('type', instance.type)
      instance.name = validated_data.get('name', instance.name)
      instance.save()
      return instance
class WidgetItemSerializer(serializers.ModelSerializer):

  class Meta:
    model = Widget
    fields = '__all__'

  def create(self, validated_data):
      return Widget.objects.create(**validated_data)

  def update(self, instance, validated_data):
      instance.widgetitemid = validated_data.get('widgetitemid', instance.widgetitemid)
      instance.page = validated_data.get('page', instance.page)
      instance.widget = validated_data.get('widget', instance.widget)
      instance.value = validated_data.get('value', instance.value)
      instance.type = validated_data.get('type', instance.type)
      instance.save()
      return instance
