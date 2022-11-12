from rest_framework import serializers
from .models import Institute, InstituteMembers

class InstituteSerializer (serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = '__all__'

    def create(self, validated_data):
        return Institute.objects.create(**validated_data)

    def update(self, instance , validated_data):
        instance.name = validated_data.get('name', instance.name).lower()
        instance.save()
        return instance


class InstituteMembersSerializer (serializers.ModelSerializer):
    class Meta:
        model = InstituteMembers
        fields = '__all__'

    def create(self, validated_data):
        return InstituteMembers.objects.create(**validated_data)
    
    def update(self, instance , validated_data):
        instance.instituteId = validated_data.get('instituteId', instance.instituteId)
        instance.userId = validated_data.get('userId', instance.userId)
        instance.save()
        return instance