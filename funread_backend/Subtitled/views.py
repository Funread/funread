from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from moviepy.editor import VideoFileClip
from .serializers import SubtitledSeralizer
from rest_framework import status
from rest_framework.response import Response
import os
import sys
sys.path.append('funread_backend')
from django.conf import settings
import librosa
import whisper
import copy
from googletrans import Translator
from googletrans.constants import LANGUAGES
from .models import Subtitled
import verifyJwt

# Create your views here.

def transcriber(file):
    video_clip = VideoFileClip(os.path.join(settings.MEDIA_ROOT, str(file)))
    audio_clip = video_clip.audio
    audio_path = os.path.join(settings.MEDIA_ROOT, "audio.mp3")
    audio_clip.write_audiofile(audio_path, codec="mp3")
    audio_data, sample_rate = librosa.load(audio_path)
    model = whisper.load_model("base.en")
    transcription = model.transcribe(audio_data)
    video_clip.close()
    audio_clip.close()
    os.remove(audio_path)
    if "text" in transcription:
        del transcription["text"]
    if "language" in transcription:
        del transcription["language"]
    for segment in transcription["segments"]:
        if "seek" in segment:
            del segment["seek"]
        if "tokens" in segment:
            del segment["tokens"]
        if "temperature" in segment:
            del segment["temperature"]
        if "avg_logprob" in segment:
            del segment["avg_logprob"]
        if "compression_ratio" in segment:
            del segment["compression_ratio"]
        if "no_speech_prob" in segment:
            del segment["no_speech_prob"]
    return transcription

def translator(transcription):
    translator = Translator()
    translation = copy.deepcopy(transcription)
    translated_translation = copy.deepcopy(translation)
    translated_segments = []
    for segment in translation["segments"]:
        text_to_translate = segment["text"]
        translation_result = translator.translate(text_to_translate, src='en', dest='es')
        translated_segment = copy.deepcopy(segment)
        translated_segment["text"] = translation_result.text
        translated_segments.append(translated_segment)
    translated_translation["segments"] = translated_segments
    return translated_translation

def save_subtitled(file):
    Jsontranscription = transcriber(file)
    Jsontranslation = translator(Jsontranscription)
    name = os.path.basename(str(file))
    id = os.path.splitext(name)[0]
    data = {
        'idmedia': id,
        'transcription': Jsontranscription,
        'translation': Jsontranslation
    }
    serializer = SubtitledSeralizer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['POST'])
def GETtranscription(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        video = Subtitled.objects.get(idmedia=request.data.get('idvideo'))
    except Subtitled.DoesNotExist:
        return Response("Archivo no encotrado",status=status.HTTP_404_NOT_FOUND)
    Jsontranscription = video.transcription
    return JsonResponse(Jsontranscription, safe=False)

@ api_view(['POST'])
def GETtranslation(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        video = Subtitled.objects.get(idmedia=request.data.get('idvideo'))
    except Subtitled.DoesNotExist:
        return Response("Archivo no encotrado",status=status.HTTP_404_NOT_FOUND)
    Jsontranslation = video.translation
    return JsonResponse(Jsontranslation, safe=False)