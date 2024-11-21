import os
import whisper
from gtts import gTTS
import language_tool_python
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.conf import settings

class AudioToTextView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        try:
            # 1. Obtener el archivo de audio del request
            audio_file = request.FILES.get('audio5')
            if not audio_file:
                return JsonResponse({"error": "No se proporcionó ningún archivo de audio."}, status=400)
            
            # Guardar temporalmente el archivo para procesarlo
            audio_path = os.path.join(settings.MEDIA_ROOT, audio_file.name)
            with open(audio_path, 'wb') as f:
                f.write(audio_file.read())
            
            # 2. Transcribir audio a texto
            model = whisper.load_model("base")
            result = model.transcribe(audio_path)
            transcribed_text = result.get("text", "").strip()

            # 3. Revisar y corregir ortografía y gramática con LanguageTool
            tool = language_tool_python.LanguageTool("es")  # Configurar para español
            corrected_matches = tool.correct(transcribed_text)

            # 4. Convertir texto corregido a audio
            tts = gTTS(text=corrected_matches, lang='es')
            audio_output_path = os.path.join(settings.MEDIA_ROOT, "output_audio.mp3")
            tts.save(audio_output_path)

            # 5. Retornar texto corregido y enlace al audio
            return JsonResponse({
                "transcribed_text": transcribed_text,
                "corrected_text": corrected_matches,
                "audio_url": f"{request.build_absolute_uri(settings.MEDIA_URL)}output_audio.mp3"
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        finally:
            # Limpieza de archivos temporales
            if os.path.exists(audio_path):
                os.remove(audio_path)
