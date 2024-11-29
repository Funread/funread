from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookCoverSerializer
import requests
import os
import logging

logger = logging.getLogger(__name__)

class BookCoverCreateView(APIView):
    def post(self, request):
        serializer = BookCoverSerializer(data=request.data)
        if serializer.is_valid():
            description = serializer.validated_data.get('description', '')

            try:
                # Llamada a la API de generación de portadas
                image_path = self.generate_book_cover(description)
                if image_path:
                    return Response({"image_path": image_path}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Error al generar la portada del libro"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error("Error llamando a la API de generación de portadas: %s", str(e))
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_book_cover(self, description):
        # Genera el prompt para la portada del libro
        prompt = (
            f"Illustration for a children's book cover. {description}. Style: friendly, child-like, vibrant colors, suitable for a Latin American, Costa Rican context."           
        )


        # Configura la solicitud a la API de generación de imágenes
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
            image_path = "./BookCover/book_cover_image.jpeg"
            with open(image_path, 'wb') as file:
                file.write(response.content)
            return image_path
        else:
            logger.error("Error en la respuesta de la API: %s", response.json())
            return None
