import verifyJwt
from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MediaSeralizer
from .models import Media
from rest_framework import status
import os
import sys
sys.path.append('funread_backend')


@ api_view(['POST'])
def save_File(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if 'file' not in request.data:
        raise Exception("upload file please")
    file_request = request.FILES.get('file')
    if file_request:
        name_file = file_request.name
        extension = name_file.split('.')[-1]
        type = get_file_type(extension)
        if (type == 0):
            return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, mp4, avi, mkv, mov, wmv, flv'}, status=status.HTTP_400_BAD_REQUEST)
        data = {
            'name': 'name',
            'extension': extension,
            'file': file_request,
            'type':type
        }
    serializer = MediaSeralizer(data=data)
    print(serializer.is_valid())
    if serializer.is_valid():
        id = 0
        try:
            filebefore = Media.objects.latest('id')
            id = filebefore.id
        except Media.DoesNotExist: pass
        validate_data = serializer.validated_data
        file = Media(**validate_data)
        file.name = str(id+1)
        file.file.name = str(id+1) + '.' + file.extension
        file.save()
        serializer_response = MediaSeralizer(file)
        return Response(serializer_response.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['POST'])
def upload(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if 'name' not in request.data:
        raise Exception("invalid data")
    if request.method == 'POST':
        try:
            filedata = Media.objects.get(id=request.data.get('name'))
        except Media.DoesNotExist:
            message_error1 = {'Error': 'file not found'}
            return JsonResponse(message_error1, status=status.HTTP_404_NOT_FOUND)
        ruta_completa = os.path.join(settings.MEDIA_ROOT, str(filedata.file))
        try:
            with open(ruta_completa, 'rb') as filen:
                mensaje = {'file_route': '/Media/'+str(filedata.file)}
                return JsonResponse(mensaje)
        except FileNotFoundError:
            message_error2 = {'Error': 'invalid route'}
            return JsonResponse(message_error2, status=status.HTTP_404_NOT_FOUND)


@ api_view(['GET'])
def listed(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.all()
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def listed_Images(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=1)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def listed_Audios(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=2)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def listed_Videos(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=3)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def change_file(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    if 'file' not in request.data:
        raise Exception("upload file please")
    file_request = request.FILES.get('file')
    if 'idfile' not in request.data:
        raise Exception("please enter the id")
    try:
        old_file = Media.objects.get(id=request.data.get('idfile'))
    except Media.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if file_request:
        name_file = file_request.name
        extension = name_file.split('.')[-1]
        file_request.name = str(old_file.name)+'.'+extension
        type = get_file_type(extension)
        if (type == 0):
            return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, mp4, avi, mkv, mov, wmv, flv'}, status=status.HTTP_400_BAD_REQUEST)
        data = {
            'name': old_file.name,
            'extension': extension,
            'file': file_request,
            'type': type
        }
    serializer = MediaSeralizer(old_file, data=data)
    if serializer.is_valid():
        ruta_oldfile = os.path.join(settings.MEDIA_ROOT, str(old_file.file.name))
        print(ruta_oldfile)
        os.remove(ruta_oldfile)
        serializer.save()
        return Response("file updated successfully", status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_file_type(extension):
    image_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff'}
    audio_extensions = {'mp3', 'wav', 'ogg', 'flac', 'aac','midi','wma','cd','aif','aifc','aiff','pcm','m4a'}
    video_extensions = {'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'}

    lowercase_extension = extension.lower()  # Convierte la extensión a minúsculas para ser insensible a mayúsculas/minúsculas.

    if lowercase_extension in image_extensions:
        return 1  # Es una imagen
    elif lowercase_extension in audio_extensions:
        return 2  # Es audio
    elif lowercase_extension in video_extensions:
        return 3  # Es video
    else:
        return 0  #