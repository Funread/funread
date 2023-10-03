from rest_framework import serializers
from .models import Joins


class JoinSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Joins
        fields = '__all__'

    def create(self, validated_data):
        return Joins.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.booid = validated_data.get('bookid', instance.bookid)
        instance.classesid = validated_data.get('classesid', instance.classesid)
        instance.save()
        return instance
