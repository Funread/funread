from rest_framework import serializers
import re

class AvatarSerializer(serializers.Serializer):
    # Definición de campos permitidos
    sex = serializers.ChoiceField(choices=['men', 'women'])
    skin_color = serializers.ChoiceField(choices=['light', 'medium', 'dark', 'tan', 'pale'])
    hair_style = serializers.CharField()
    hair_length = serializers.ChoiceField(choices=['short', 'medium', 'long', 'bald'])
    accessories = serializers.ListField(child=serializers.CharField(), allow_empty=True)
    body_type = serializers.ChoiceField(choices=['slim', 'average', 'athletic', 'muscular', 'plus-size'])
    hair_color = serializers.CharField()
    eye_color = serializers.CharField()

    # Validación de color de cabello
    def validate_hair_color(self, value):
        if not self.is_valid_color(value):
            raise serializers.ValidationError(f"El color de cabello '{value}' no es válido.")
        return value

    # Validación de color de ojos
    def validate_eye_color(self, value):
        if not self.is_valid_color(value):
            raise serializers.ValidationError(f"El color de ojos '{value}' no es válido.")
        return value

    # Verifica si el color es válido (nombre compuesto o hexadecimal)
    def is_valid_color(self, value):
        color_pattern = re.compile(r'^#[0-9A-Fa-f]{6}$')  # Hexadecimal
        if color_pattern.match(value):
            return True
        # Valida colores con letras y espacios
        name_pattern = re.compile(r'^[a-zA-Z\s]+$')
        return bool(name_pattern.match(value))
