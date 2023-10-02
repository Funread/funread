from rest_framework import serializers
from .models import GroupsCreate

class GorupsCreateSeralizer(serializers.ModelSerializer):
    class Meta:
        model = GroupsCreate
        fields = '__all__'

        def create(self, validated_data):
            return GroupsCreate.objects.create(**validated_data)