from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai
from .models import OpenAIInteraction
from .serializer import OpenAIInteractionSerializer
from decouple import config
from .models import OpenAIInteraction


openai.api_key = config('OPENAI_API_KEY')

class OpenAIChatView(APIView):
    def post(self, request, *args, **kwargs):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=50
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        openai_interaction = OpenAIInteraction.objects.create(
            prompt=prompt,
            response=response['choices'][0]['text']
        )
        
        serializer = OpenAIInteractionSerializer(openai_interaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
