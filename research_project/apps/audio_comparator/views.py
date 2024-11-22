import os
import whisper
from gtts import gTTS
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.conf import settings

class AudioComparatorView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        audio_path = None  # Inicializar para limpieza posterior
        try:
            # 1. Obtener el archivo de audio y el texto esperado del request
            audio_file = request.FILES.get('audio5')
            expected_text = request.data.get('expected_text', '').strip()

            if not audio_file or not expected_text:
                return JsonResponse({"error": "Se requiere un archivo de audio y el texto esperado."}, status=400)
            
            # Guardar temporalmente el archivo de audio para procesarlo
            audio_path = os.path.join(settings.MEDIA_ROOT, audio_file.name)
            with open(audio_path, 'wb') as f:
                f.write(audio_file.read())
            
            # 2. Transcribir audio a texto usando Whisper
            model = whisper.load_model("small")
            result = model.transcribe(audio_path)
            transcribed_text = result.get("text", "").strip()

            # 3. Comparar el texto transcrito con el texto esperado
            match_percentage = self.compare_texts(transcribed_text, expected_text)

            # 4. Convertir el texto esperado a audio
            tts = gTTS(text=expected_text, lang='en')  # Cambiar a 'es' para español
            audio_output_path = os.path.join(settings.MEDIA_ROOT, "expected_audio.mp3")
            tts.save(audio_output_path)

            # 5. Responder con los resultados
            return JsonResponse({
                "transcribed_text": transcribed_text,
                "expected_text": expected_text,
                "match_percentage": match_percentage,
                "audio_url": f"{request.build_absolute_uri(settings.MEDIA_URL)}expected_audio.mp3"
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        finally:
            # Limpieza de archivos temporales
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)

    def compare_texts(self, text1, text2):
        """
        Compara dos textos y calcula el porcentaje de similitud usando palabras.
        """
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        common_words = words1 & words2
        total_words = words1 | words2
        if not total_words:
            return 0.0
        return round((len(common_words) / len(total_words)) * 100, 2)
