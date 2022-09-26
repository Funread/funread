from dataclasses import fields
from rest_framework import serializers
from TeacherApp.models import Teachers

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teachers
        fields=('TeacherId', 'TeacherName', 'TeacherPwd')

    def create(self, validated_data):
        return Teachers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.save()
        return instance