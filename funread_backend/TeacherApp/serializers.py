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
        instance.TeacherName = validated_data.get('TeacherName', instance.TeacherName)
        instance.TeacherPwd = validated_data.get('TeacherPwd', instance.TeacherPwd)
        instance.save()
        return instance