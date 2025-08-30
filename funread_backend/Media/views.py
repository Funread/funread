import verifyJwt
from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MediaSeralizer
from .models import Media
from funread_backend.jwt_service import JwtService
from Users.models import User
from rest_framework import status
from Subtitled.views import save_subtitled
import os
import sys
sys.path.append('funread_backend')
from django.db import OperationalError

@ api_view(['POST'])
def save_File(request):
    print("request.user:", request.user)
    print("is_authenticated:", getattr(request.user, 'is_authenticated', None))
    print("user type:", type(request.user))

    # token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Extraer user_id del JWT y buscar el usuario
    user = None
    try:
        authorization_header = request.headers.get('Authorization')
        jwt_service = JwtService(authorization_header)
        user_id = jwt_service.get_user_id()
        if user_id:
            try:
                user = User.objects.get(userid=user_id)
            except User.DoesNotExist:
                user = None
    except Exception as e:
        user = None

    try:
        if 'file' not in request.data and 'file' not in request.FILES:
            raise Exception("upload file please")
        file_request = request.FILES.get('file')
        if file_request:
            name_file = file_request.name
            extension = name_file.split('.')[-1]
            file_type = get_file_type(extension)
            if (file_type == 0):
                return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, mp4, avi, mkv, mov, wmv, flv'}, status=status.HTTP_400_BAD_REQUEST)
            gallery_type = request.data.get('galleryType')
            data = {
                'name': 'name',
                'extension': extension,
                'file': file_request,
                'type': file_type,
                'galleryType': gallery_type,
                'user': user.pk if user else None,
            }
            print(data)
            serializer = MediaSeralizer(data=data)
            print('data valida: ',serializer.is_valid())
            if serializer.is_valid():
                id = 0  
                try:
                    filebefore = Media.objects.latest('id')
                    id = filebefore.id
                except Media.DoesNotExist:
                    pass
                except OperationalError:
                    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                file = serializer.save(user=user)
                file.name = str(id+1)
                file.file.name = str(id+1) + '.' + file.extension
                file.save()
                if file_type == 3:
                    response = save_subtitled(file.file)
                    print('Subtitled: ', response)
                serializer_response = MediaSeralizer(file)
                return Response(serializer_response.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['POST'])
def upload(request):

    # token verification
   try: 
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
                mensaje = {'file_route': '/api/media/'+str(filedata.file)}
                return JsonResponse(mensaje)
        except FileNotFoundError:
            message_error2 = {'Error': 'invalid route'}
            return JsonResponse(message_error2, status=status.HTTP_404_NOT_FOUND)
   except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    


@ api_view(['GET'])
def listed(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.all()
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Images(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=1)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Audios(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=2)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['GET'])
def listed_Videos(request):

    # token verification
   try: 
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = Media.objects.filter(type=3)
    serializer = MediaSeralizer(user, many=True)
    return Response(serializer.data)
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def change_file(request):

    #token verification
   try: 
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
   except OperationalError:
    return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


   try:
        old_file = Media.objects.get(id=request.data.get('idfile'))
   except Media.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
   try: 
    if file_request:
        name_file = file_request.name
        extension = name_file.split('.')[-1]
        file_request.name = str(old_file.name)+'.'+extension
        type = get_file_type(extension)
        if (type == 0):
            return Response({'message':'Bad file extension: only png, jpg, jpeg, gif, bmp, webp, tiff, mp3, wav, ogg, flac, aac, midi, wma, cd, aif, aifc, aiff, pcm, m4a, mp4, avi, mkv, mov, wmv, flv, opus'}, status=status.HTTP_400_BAD_REQUEST)
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
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_file_type(extension):
   try: 
    image_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff'}
    audio_extensions = {'mp3', 'wav', 'ogg', 'flac', 'aac','midi','wma','cd','aif','aifc','aiff','pcm','m4a','opus'}
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
   except OperationalError:
     return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 