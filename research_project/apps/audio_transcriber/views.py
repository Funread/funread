import os
import whisper
from gtts import gTTS
import language_tool_python
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.conf import settings
import torch


class AudioToTextView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        audio_path = None  # Inicializar variable para limpiar archivos al final
        try:
            # 1. Obtener el archivo de audio del request
            audio_file = request.FILES.get('audio7')
            if not audio_file:
                return JsonResponse({"error": "No se proporcionó ningún archivo de audio."}, status=400)
            print('ya obtuve el audio')
            if not audio_file.name.lower().endswith(('.mp3', '.wav', '.ogg')):
                return self._error_response("El archivo debe ser de tipo audio (mp3, wav, ogg).", 400)
            # Guardar temporalmente el archivo para procesarlo
            audio_path = os.path.join(settings.MEDIA_ROOT, audio_file.name)
            with open(audio_path, 'wb') as f:
                f.write(audio_file.read())
            
            # 2. Transcribir audio a texto
            ##model = whisper.load_model("large")
            model = whisper.load_model("small")
            result = model.transcribe(audio_path)
            transcribed_text = result.get("text", "").strip()
            
            # 3. Revisar y corregir ortografía y gramática con LanguageTool
            tool = language_tool_python.LanguageTool("en")  
            matches = tool.check(transcribed_text)
            corrected_text = language_tool_python.utils.correct(transcribed_text, matches)
            if matches:
                for match in matches:print(f"Error: {match.ruleId}, {match.message}")
            # 4. Convertir texto corregido a audio
            tts = gTTS(text=corrected_text, lang='en') 
            audio_output_path = os.path.join(settings.MEDIA_ROOT, "output_audio.mp3")
            tts.save(audio_output_path)

            # 5. Retornar texto corregido y enlace al audio
            return JsonResponse({
                "transcribed_text": transcribed_text,
                "corrected_text": corrected_text,
                "audio_url": f"{request.build_absolute_uri(settings.MEDIA_URL)}output_audio.mp3"
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        finally:
            # Limpieza de archivos temporales
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)
