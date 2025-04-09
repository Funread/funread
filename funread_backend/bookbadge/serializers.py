from rest_framework import serializers
from .models import BookBadge

class BookBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookBadge
        fields = '__all__'
