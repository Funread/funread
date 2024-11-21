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
    problem = 0    #0 Not Erros, 1 Error, 2 No audio in video  
    transcription = None
    
    #Load video clip
    try:
        video_clip = VideoFileClip(os.path.join(settings.MEDIA_ROOT, str(file)))
    except Exception as e:
        print(f"Error al cargar el video: {e}")
        problem = 1
        return problem, transcription 
    
    #Get audio from video
    audio_clip = video_clip.audio
    
    # Verify the video has audio 
    if audio_clip is None:
        print("El video no contiene pista de audio.")
        video_clip.close()
        problem = 2
        #Ends because the video has not audio
        return problem, transcription 

    #Try to do the transcribing
    else:
        audio_path = os.path.join(settings.MEDIA_ROOT, "audio.mp3")
        try:
            #Trying to write the audio file
            audio_clip.write_audiofile(audio_path, codec="mp3")
        except Exception as e:
            print(f"Error al escribir el archivo de audio: {e}")
            video_clip.close()
            problem = 1
            return problem, transcription

        # Continue with the transcribing process
        try:
            audio_data, sample_rate = librosa.load(audio_path)
            model = whisper.load_model("base.en")
            transcription = model.transcribe(audio_data)
        except Exception as e:
            print("Error durante la transcripción: {e}")
            video_clip.close()
            audio_clip.close()
            os.remove(audio_path)
            problem = 1
            return problem, transcription 
        
        # Close and clean
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
            return problem, transcription 


def translator(transcription):
    translator = Translator()
    translated_translation = None
    problem = 0
    # Try to translate the transcription
    try:
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
    except Exception as e:
        problem = 1
        print("Error tratando de traducir: {e}")
        return problem, translated_translation
    print('Traducido correctamente')
    return problem, translated_translation


def save_subtitled(file):
    #Transcribe audio from video
    problem, Jsontranscription = transcriber(file)
    
    if problem == 2:
        return True #The video has not audio
    if problem == 1:
        return False #Something went wrong while transcribing.
    if problem == 0:
        #Translate transcription from video
        problem, Jsontranslation = translator(Jsontranscription)
        
        if problem == 1:
            return False #Something went wrong while translating.
        else:
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
                return True #Translated correctly

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