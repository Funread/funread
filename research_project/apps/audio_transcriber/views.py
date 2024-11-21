import whisper
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

class AudioTranscriberView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Obtiene el archivo de audio del request
            audio_file = request.FILES['audio']
            
            # Guarda el archivo temporalmente
            with open(audio_file.name, 'wb') as f:
                for chunk in audio_file.chunks():
                    f.write(chunk)
            
            # Carga el modelo Whisper
            model = whisper.load_model("base")

            # Procesa el audio
            result = model.transcribe(audio_file.name)

            # Elimina el archivo temporal
            import os
            os.remove(audio_file.name)

            return Response({"transcription": result["text"]}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
