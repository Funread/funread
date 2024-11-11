from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AvatarSerializer
import requests
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class AvatarCreateView(APIView):
    def post(self, request):
        # Serializamos los datos recibidos
        serializer = AvatarSerializer(data=request.data)
        if serializer.is_valid():
            # Extraemos los datos validados
            skin_color = serializer.validated_data['skin_color']
            hair_style = serializer.validated_data['hair_style']
            accessories = serializer.validated_data['accessories']
            eye_color = request.data.get('eye_color', 'black')  # Default eye color to 'black' if not provided

            try:
                # Llamada a la función para generar el avatar con los datos
                image_path = self.generate_avatar(
                    sex=serializer.validated_data.get('sex', 'Men'),
                    skin_color=skin_color,
                    hair_style=hair_style,
                    accessories=accessories,
                    eye_color=eye_color
                )

                if image_path:
                    return Response({"image_path": image_path}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Error al generar el avatar"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error("Error llamando a la API de Stability AI: %s", str(e))
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_avatar(self, sex, skin_color, hair_style, accessories, eye_color):
        # Genera el prompt incluyendo accesorios y color de ojos
        prompt = (
            f"Cartoon-style illustration of a {sex} child from Costa Rica with {skin_color} skin, "
            f"{hair_style} hair (ensure the hair length is medium to long, regardless of gender), "
            f"and {eye_color} eyes. The character is wearing simple white clothes and has the following accessories: "
            f"{', '.join(accessories)}. The character should appear friendly, childlike, "
            "and distinctly Latin American in style."
        )

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
            # Genera un nombre de archivo único para la imagen
            image_filename = f"avatar_image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpeg"
            image_path = os.path.join("TestAvatarsMOMENTANEO", image_filename)

            # Guarda la imagen en el servidor
            with open(image_path, 'wb') as file:
                file.write(response.content)
            return image_path
        else:
            logger.error("Error en la respuesta de la API: %s", response.json())
            return None
