from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from googletrans import Translator
from django.http import JsonResponse
import os
from gtts import gTTS
import pygame
import tempfile

@api_view(['POST'])
def google_translate(request):
    if request.method == 'POST':
        text_to_translate = request.data.get('text', '')
        target_language = request.data.get('target_language', 'en')

        if not text_to_translate:
            return JsonResponse({'error': 'Debes proporcionar un texto para traducir.'}, status=400)
        
        # Traducir el texto
        translator = Translator()
        translation = translator.translate(text_to_translate, dest=target_language)
        translated_text = translation.text
        
        return JsonResponse({'translated_text': translated_text})
    else:
        return JsonResponse({'error': 'Este endpoint solo admite solicitudes POST.'}, status=400)
    
@api_view(['POST'])
def text_to_speech(request):
    if request.method == 'POST':
        text_to_speak = request.data.get( 'text', '')
        target_language = request.data.get('target_language', 'en')

        if not text_to_speak:
            return JsonResponse({'error': 'Debes proporcionar un texto para convertir a voz.'}, status=400)

        # Generar voz a partir del texto original
        tts = gTTS(text_to_speak, lang=target_language)

        # Crear un archivo temporal para almacenar el audio
        with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as temp_audio_file:
            audio_file_path = temp_audio_file.name
            tts.save(audio_file_path)
        
        #La unica razon por la que se utiliza pygame es para reproducir el audio, se puede eliminar 
        pygame.mixer.init()
        pygame.mixer.music.load(audio_file_path)
        pygame.mixer.music.play()

        return JsonResponse({'text_to_speech_audio_url': audio_file_path})
    else:
        return JsonResponse({'error': 'Este endpoint solo admite solicitudes POST.'}, status=400)