import os
import whisper
from gtts import gTTS
import difflib
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.conf import settings


class AudioComparatorView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        audio_path = None  # Inicializar variable para que se limpie luego
        audio_output_path = None

        try:
            # 1. Validar entrada
            if not request.FILES:
                return self._error_response("No se recibió ningún archivo de audio.", 400)

            # Tomar el primer archivo enviado (independientemente de su nombre)
            audio_file = next(iter(request.FILES.values()))
            expected_text = request.data.get('expected_text', '').strip()

            if not expected_text:
                return self._error_response("El texto esperado es obligatorio.", 400)

            if not audio_file.name.lower().endswith(('.mp3', '.wav', '.ogg')):
                return self._error_response("El archivo debe ser de tipo audio (mp3, wav, ogg).", 400)

            # 2. Guardar archivo de audio temporalmente
            audio_path = self._save_temporary_file(audio_file)

            # 3. Transcribir audio a texto usando Whisper
            transcribed_text = self._transcribe_audio(audio_path)

            # 4. Comparar texto transcrito con texto esperado
            match_percentage = self._compare_texts(transcribed_text, expected_text)

            # 5. Generar archivo de audio con el texto esperado (TTS)
            audio_output_path = self._generate_tts_audio(expected_text)

            # 6. Responder con los resultados
            return JsonResponse({
                "transcribed_text": transcribed_text,
                "expected_text": expected_text,
                "match_percentage": match_percentage,
                "audio_url": f"{request.build_absolute_uri(settings.MEDIA_URL)}expected_audio.mp3"
            })

        except whisper.WhisperException as e:
            return self._error_response(f"Error al procesar el archivo de audio: {str(e)}", 500)
        except Exception as e:
            return self._error_response(f"Error inesperado: {str(e)}", 500)
        finally:
            # Limpieza de archivos temporales
            self._cleanup_files([audio_path, audio_output_path])

    def _save_temporary_file(self, file):
        """
        Guarda el archivo temporalmente en el sistema de archivos.
        """
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, 'wb') as f:
            f.write(file.read())
        return file_path

    def _transcribe_audio(self, audio_path):
        """
        Usa Whisper para transcribir el audio.
        """
        model = whisper.load_model("small")  # Ajustar según el caso
        result = model.transcribe(audio_path)
        return result.get("text", "").strip()

    def _compare_texts(self, text1, text2):
        """
        Compara dos textos y calcula el porcentaje de similitud.
        """
        seq = difflib.SequenceMatcher(None, text1.lower(), text2.lower())
        return round(seq.ratio() * 100, 2)

    def _generate_tts_audio(self, text):
        """
        Genera un archivo de audio a partir del texto esperado usando TTS.
        """
        tts = gTTS(text=text, lang='en')  # Cambiar a 'es' si es necesario
        output_path = os.path.join(settings.MEDIA_ROOT, "expected_audio.mp3")
        tts.save(output_path)
        return output_path

    def _cleanup_files(self, file_paths):
        """
        Elimina archivos temporales para liberar espacio.
        """
        for file_path in file_paths:
            if file_path and os.path.exists(file_path):
                os.remove(file_path)

    def _error_response(self, message, status):
        """
        Retorna una respuesta de error estándar.
        """
        return JsonResponse({"error": message}, status=status)