from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import File
from .serializers import  FileSerializer, FileSerializerFile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt

# Create your views here.
#----------------Metodo que me devuelve la lista de objetos---------------#
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    file = File.objects.all()
    serializer = FileSerializer(file, many=True)
    return Response(serializer.data)

#--------------Metodo que devuelve uno en especifico------------------------#
@api_view(['GET'])
def filesearch(request, namefile):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        file = File.objects.get(namefile=namefile)
        print()
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FileSerializer(file)
    return Response(serializer.data, status=status.HTTP_200_OK)

#-------------------Metodo para eliminar un file------------------------------#
@api_view(['DELETE'])
def deleteFile(request, namefile):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    folder = File.objects.get(namefile=namefile)
    folder.delete()

    return Response(status=status.HTTP_200_OK)

#-------------------Metodo para agregar-----------------------------------------#
@api_view(['POST'])
def new_file(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'namefile': request.data.get('namefile').lower(),
        'filelocation': request.data.get('filelocation'),
        'foldersid': request.data.get('foldersid'),
        'uploadby': request.data.get('uploadby'),
        'idtags' : request.data.get('idtags' ),
    }
    serializer = FileSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#----------------------Metodo que actualiza-----------------------------------------#
@api_view(['PUT'])
def fileChange(request, namefile):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    file = File.objects.get(namefile=namefile)
    serializer = FileSerializer(file, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

