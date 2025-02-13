from rest_framework import serializers

class BookCoverSerializer(serializers.Serializer):
    description = serializers.CharField(max_length=500, required=False, allow_blank=True)
