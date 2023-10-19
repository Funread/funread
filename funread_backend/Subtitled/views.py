from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from moviepy.editor import VideoFileClip
import os
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import librosa
import whisper
from moviepy.editor import AudioFileClip
import pandas as pd
import ffmpeg


# Create your views here.

@api_view(['POST'])
def transcribe_video_audio(request):

    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    video_file = request.FILES.get('video')
    if video_file:
        fsvideo = FileSystemStorage()
        fsaudio = FileSystemStorage()
        video_path = fsvideo.save(video_file.name, video_file)
        video_clip = VideoFileClip(os.path.join(settings.MEDIA_ROOT, video_path))
        audio_clip = video_clip.audio
        audio_output_path = os.path.join(settings.MEDIA_ROOT, "audio.mp3")
        audio_clip.write_audiofile(audio_output_path, codec="mp3")
        audio_data, sample_rate = librosa.load(audio_output_path)
        model = whisper.load_model("medium")
        result = model.transcribe(audio_data)
        df = pd.DataFrame(result["segments"])[['start','end','text']]
        df_json = df.to_json(orient='records')
        print(df_json)
        #fsvideo.delete(video_path)
        return JsonResponse({'transcription': df_json})
    return JsonResponse({'error': 'Archivo no cargado'}, status=405)