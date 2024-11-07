import requests
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Avatar
from .serializers import AvatarSerializer
from django.conf import settings

# Función para generar la imagen de avatar usando Hugging Face
def generate_avatar_image(skin_tone, hair_color, accessory):
    # Genera el prompt para Stable Diffusion
    prompt = f"Avatar with {skin_tone} skin, {hair_color} hair, wearing {accessory}"

    # Configura la solicitud a la API de Hugging Face
    api_url = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4"
    headers = {
        "Authorization": f"Bearer {settings.HUGGING_FACE_API_TOKEN}"
    }
    payload = {
        "inputs": prompt
    }

    # Realiza la solicitud
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()  # Lanza excepción si hay un error en la solicitud

        # Depuración para ver el estado de la respuesta y el contenido JSON
        print("Estado de la respuesta:", response.status_code)
        print("Contenido de la respuesta:", response.json())

        # Ajusta aquí si el endpoint devuelve la imagen directamente o la URL de la imagen
        image_url = response.json().get("url")  # Asegúrate de que sea el campo correcto en la respuesta
        if image_url:
            return image_url
        else:
            print("No se encontró 'url' en la respuesta de Hugging Face.")
            return None

    except requests.exceptions.RequestException as e:
        print("Error en la solicitud a Hugging Face:", e)
        return None

# Vista para manejar las operaciones CRUD de los Avatares
class AvatarViewSet(viewsets.ModelViewSet):
    queryset = Avatar.objects.all()
    serializer_class = AvatarSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extraer los datos de skin_tone, hair_color y accessory
        skin_tone = serializer.validated_data.get("skin_tone")
        hair_color = serializer.validated_data.get("hair_color")
        accessory = serializer.validated_data.get("accessory")
        
        # Generar la imagen con Hugging Face
        image_url = generate_avatar_image(skin_tone, hair_color, accessory)
        if not image_url:
            return Response({"error": "Error al generar el avatar"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Guardar el avatar con la URL de la imagen
        avatar = serializer.save(image_url=image_url)
        return Response(self.get_serializer(avatar).data, status=status.HTTP_201_CREATED)
