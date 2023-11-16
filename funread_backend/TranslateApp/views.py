from rest_framework.response import Response
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from googletrans import Translator
from django.http import JsonResponse
import os
from gtts import gTTS
import pygame
import tempfile
import mimetypes
import os
import base64

@api_view(['POST'])
def google_translate(request):
    if request.method == 'POST':
        text_to_translate = request.data.get('text', '')
        target_language = request.data.get('target_language', 'en')

        if not text_to_translate:
            return JsonResponse({'error': 'Debes proporcionar un texto para traducir.'}, status=400)
        
        #Agregamos palabras extra para garantizar el limite de palabras
        text_to_translate += ' 123 123'

        # Traducir el texto
        translator = Translator()
        translation = translator.translate(text_to_translate, dest=target_language)
        translated_text = translation.text
        
        return JsonResponse({'translated_text': translated_text[:-8]})
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
        
        # Leer el contenido del archivo de audio en binario
        with open(audio_file_path, 'rb') as audio_file:
            audio_binary = audio_file.read()
            audio_base64 = base64.b64encode(audio_binary).decode('utf-8')

        # Obtener la extensión del archivo
        file_extension = os.path.splitext(audio_file_path)[1]

        # Crear una respuesta JSON con el contenido codificado en base64
        response_data = {
            'audio_base64': audio_base64,
            'file_extension': file_extension
        }

        # Eliminar el archivo temporal
        os.unlink(audio_file_path)

        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Este endpoint solo admite solicitudes POST.'}, status=400)