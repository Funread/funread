from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MediaSeralizer
from .models import Media
from rest_framework import status
#from django.http import HttpResponse
import os
import sys
sys.path.append('funread_backend')
import verifyJwt

@ api_view(['POST'])
def save_Image(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    if 'image' not in request.data:
        raise Exception("Archivo no encontrado")
    if request.method == 'POST':
        image_request = request.FILES.get('image')
    if image_request:
        name_img = image_request.name
        extension = name_img.split('.')[-1]
        data = {
            'name': 'name',
            #'route': "url",
            'extension': extension,
            'image': image_request
        }
    serializer = MediaSeralizer(data=data)
    if serializer.is_valid():
        id = 0
        try:
            imagebefore = Media.objects.latest('id')
            id = imagebefore.id
        except Media.DoesNotExist: pass
        validate_data = serializer.validated_data
        image = Media(**validate_data)
        image.name = str(id+1)
        image.image.name = str(id+1) + '.' + image.extension
        #image.route = os.path.join(settings.MEDIA_ROOT, image.name)
        image.save()
        serializer_response = MediaSeralizer(image)
        return Response(serializer_response.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['POST'])
def upload(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    if 'name' not in request.data:
        raise Exception("invalid data")
    if request.method == 'POST':
        try:
            imagedata = Media.objects.get(id=request.data.get('name'))
        except Media.DoesNotExist:
            message_error1 = {'Error': 'image not found'}
            return JsonResponse(message_error1,status=status.HTTP_404_NOT_FOUND)
        ruta_completa = os.path.join(settings.MEDIA_ROOT, str(imagedata.image))
        try:
            with open(ruta_completa, 'rb') as imagen:
                #return HttpResponse(imagen.read(), content_type="image/png")
                mensaje = {'image_route': str(imagedata.image)}
                return JsonResponse(mensaje)
        except FileNotFoundError:
            message_error2 = {'Error': 'invalid route'}
            return JsonResponse(message_error2, status=status.HTTP_404_NOT_FOUND)