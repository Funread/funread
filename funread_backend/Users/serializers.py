from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.password = validated_data.get('password', instance.password)
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance

class UserUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance



class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['actived']

    def update(self, instance, validated_data):
        instance.actived = validated_data.get('actived', instance.actived)
        instance.save()
        return instance

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userid','email','name','lastname','username']
        
class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','password']

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance
