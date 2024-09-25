from rest_framework.views import APIView
from rest_framework.response import Response
from decouple import config
from openai import OpenAI

#Objeto para el api key
client = OpenAI(api_key=config('OPENAI_API_KEY'))

class GrammarAssistantView(APIView):
    def post(self, request, *args, **kwargs):

        # Obtiene el prompt desde la solicitud del usuario
        prompt = request.data.get("prompt", "")

        if not prompt:
            return Response({"error": "Prompt is required."}, status=400)

        try:
            # Realiza la solicitud a OpenAI
            response = client.chat.completions.create(model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an English tutor. Your task is to help the user improve their English by providing grammar corrections, explanations and tips."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,#corresponde al nivel de léxico de respuesta de la IA
            max_tokens=50,
            top_p=1)

            # Obtiene la respuesta generada
            grammar_correction = response.choices[0].message.content

            # Devuelve la respuesta corregida
            return Response({"response": grammar_correction})

        except Exception as e:
            # Maneja cualquier excepción y devuelve un error genérico
            return Response({"error": str(e)}, status=500)
