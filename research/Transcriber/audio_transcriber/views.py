import whisper
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

# Cargar el modelo de Whisper (opcionalmente ajusta el modelo según tu capacidad)
model = whisper.load_model("base")

@csrf_exempt
def transcribe_audio(request):
    if request.method == 'POST' and request.FILES.get('audio_file'):
        # Obtener el archivo de audio subido
        audio_file = request.FILES['audio_file']
        file_path = os.path.join('media', audio_file.name)

        # Guardar el archivo en el servidor temporalmente
        with open(file_path, 'wb') as f:
            for chunk in audio_file.chunks():
                f.write(chunk)

        try:
            # Transcribir el audio con Whisper
            result = model.transcribe(file_path)
            text = result['text']
        except Exception as e:
            os.remove(file_path)
            return JsonResponse({'error': str(e)}, status=500)

        # Borrar el archivo de audio temporal
        os.remove(file_path)

        # Retornar la transcripción como respuesta JSON
        return JsonResponse({'transcription': text})

    return JsonResponse({'error': 'No audio file uploaded'}, status=400)
