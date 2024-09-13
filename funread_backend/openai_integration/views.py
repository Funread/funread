from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai  # Asegúrate de tener la biblioteca instalada
from .models import OpenAIInteraction
from .serializer import OpenAIInteractionSerializer

openai.api_key = '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'

class OpenAIChatView(APIView):
    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )
        
        openai_interaction = OpenAIInteraction.objects.create(
            prompt=prompt,
            response=response['choices'][0]['text']
        )
        
        serializer = OpenAIInteractionSerializer(openai_interaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
