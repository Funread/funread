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
            accessories = serializer.validated_data['accessories']

            try:
                # Llamada a la API de Hugging Face
                avatar_data = self.generate_avatar(skin_color, hair_style, accessories)
                return Response(avatar_data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error("Error calling Hugging Face API: %s", str(e))
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_avatar(self, skin_color, hair_style, accessories):
        url = "https://api-inference.huggingface.co/models/tu-modelo"
        headers = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}
        payload = {
            "inputs": {
                "skin_color": skin_color,
                "hair_style": hair_style,
                "accessories": accessories
            }
        }
        logger.info("Calling Hugging Face API with payload: %s", payload)
        response = requests.post(url, headers=headers, json=payload)
        logger.info("Hugging Face API response: %s", response.text)
        return response.json()