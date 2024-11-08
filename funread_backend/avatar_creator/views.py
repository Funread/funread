# avatar_creator/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AvatarSerializer
import requests
import os
import logging

logger = logging.getLogger(__name__)

class AvatarCreateView(APIView):
    def post(self, request):
        serializer = AvatarSerializer(data=request.data)
        if serializer.is_valid():
            skin_color = serializer.validated_data['skin_color']
            hair_style = serializer.validated_data['hair_style']
            accessories = ", ".join(serializer.validated_data['accessories'])

            try:
                # Llamada a la API de Stability AI para generar el avatar
                image_path = self.generate_avatar(skin_color, hair_style, accessories)
                if image_path:
                    return Response({"image_path": image_path}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Error al generar el avatar"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error("Error llamando a la API de Stability AI: %s", str(e))
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_avatar(self, skin_color, hair_style, accessories):
        # Genera el prompt
        prompt = f"Avatar with {skin_color} skin, {hair_style} hair, wearing {accessories}"

        # Configura la solicitud a la API de Stability AI
        url = "https://api.stability.ai/v2beta/stable-image/generate/sd3"
        headers = {
            "authorization": f"Bearer {os.getenv('STABILITY_API_KEY')}",
            "accept": "image/*"
        }
        data = {
            "prompt": prompt,
            "output_format": "jpeg",
        }

        # Realiza la solicitud a Stability AI
        response = requests.post(url, headers=headers, files={"none": ''}, data=data)

        # Manejo de la respuesta
        if response.status_code == 200:
            # Guarda la imagen en el servidor
            image_path = "./avatar_image.jpeg"
            with open(image_path, 'wb') as file:
                file.write(response.content)
            return image_path
        else:
            logger.error("Error en la respuesta de la API: %s", response.json())
            return None
