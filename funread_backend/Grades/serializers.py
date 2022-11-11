from rest_framework import serializers
from .models import Grades

#---------------------/---------------------
class GradeSerializer (serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = '__all__'

    def create(self, validated_data):
        return Grades.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.booksid = validated_data.get('booksid', instance.booksid).lower()
        instance.progress = validated_data.get('progress', instance.progress)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.iduser = validated_data.get('iduser', instance.iduser)
        instance.save()
        return instance

class GradeChangeSerializer (serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = ['grade']

    
    def update(self, instance , validated_data):
        instance.Grade = validated_data.get('grade', instance.Grade).lower()
        instance.save()
        return instance

