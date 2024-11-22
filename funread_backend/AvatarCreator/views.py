from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import os
import logging
import uuid

# Configuración del logger para registrar información y errores
logger = logging.getLogger(__name__)

class AvatarCreateView(APIView):
    
    def post(self, request):
        # Extraemos los datos directamente del request
        sex = request.data.get('sex', 'Men')
        skin_color = request.data.get('skin_color')
        hair_color = request.data.get('hair_color', '')
        hair_style = request.data.get('hair_style', '')
        hair_length = request.data.get('hair_length', '')
        accessories = request.data.get('accessories', [])
        eye_color = request.data.get('eye_color', 'black')  # Default 'black' si no se proporciona
        body_type = request.data.get('body_type', '')

        try:
            # Generamos el avatar con los datos proporcionados
            image_path = self.generate_avatar(
                sex=sex,
                skin_color=skin_color,
                hair_color=hair_color,
                hair_style=hair_style,
                hair_length=hair_length,
                accessories=accessories,
                eye_color=eye_color,
                body_type=body_type
            )

            # Retornamos la ruta de la imagen generada
            if image_path:
                return Response({"image_path": image_path}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Error al generar el avatar"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Registramos el error en el log
            logger.error("Error llamando a la API de Stability AI: %s", str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def generate_avatar(self, sex, skin_color, hair_color, hair_style, hair_length, accessories, eye_color, body_type):
        # Creamos el prompt con los datos recibidos
        prompt = (
            f"Cartoon-style illustration of a {sex} child from Costa Rica with {skin_color} skin, "
            f"Hair color: {hair_color}, Hair style: {hair_style}, Hair length: {hair_length}. "
            f"{'and accessories: ' + ', '.join(accessories) + '.' if accessories else ''} "
            f"Eye color: {eye_color}. "
            f"Body type: {body_type}. "
            "The character should appear friendly, childlike, and distinctly Costa Rican."
        )
        # Ruta donde se guardarán las imágenes generadas
        avatars_dir = './TestAvatars'
        if not os.path.exists(avatars_dir):
            os.makedirs(avatars_dir)

        # Configuración de la solicitud a la API de Stability AI
        url = "https://api.stability.ai/v2beta/stable-image/generate/sd3"
        headers = {
            "authorization": f"Bearer {os.getenv('STABILITY_API_KEY')}",
            "accept": "image/*"
        }
        data = {
            "prompt": prompt,
            "output_format": "jpeg",
        }

        try:
            # Realizamos la solicitud a la API
            response = requests.post(url, headers=headers, files={"none": ''}, data=data)

            # Log del código de estado y tipo de contenido de la respuesta
            logger.info(f"Código de estado: {response.status_code}")
            logger.info(f"Tipo de contenido: {response.headers.get('Content-Type')}")
            
            # Log de la respuesta completa
            logger.info(f"Respuesta completa de la API: {response.text}")
            # Si la respuesta es JSON, tratamos de obtener la URL de la imagen
            if "application/json" in response.headers.get('Content-Type', ''):
                response_data = response.json()
                image_url = response_data.get('image_url', '')
                if image_url:
                    image_path = f"{avatars_dir}/{uuid.uuid4()}.jpeg"
                    with open(image_path, 'wb') as file:
                        file.write(response.content)
                    return image_path
                else:
                    logger.error("La respuesta no contiene una URL de imagen.")
                    return None
            else:
                # Si la respuesta contiene una imagen, la guardamos directamente
                if "image/" in response.headers.get('Content-Type', ''):
                    image_path = f"{avatars_dir}/{uuid.uuid4()}.jpeg"
                    with open(image_path, 'wb') as file:
                        file.write(response.content)
                    return image_path
                else:
                    logger.error("La respuesta no es válida.")
                    return None

        # Manejamos posibles errores de conexión
        except requests.exceptions.RequestException as e:
            logger.error(f"Error en la solicitud: {str(e)}")
            return None
