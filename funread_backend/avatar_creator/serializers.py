from rest_framework import serializers

class AvatarSerializer(serializers.Serializer):
    skin_color = serializers.CharField()
    hair_style = serializers.CharField()
    accessories = serializers.ListField(
        child=serializers.CharField(),
        required=False,  # Hace que el campo sea opcional
        default=[]       # Valor por defecto si no se proporciona
    )