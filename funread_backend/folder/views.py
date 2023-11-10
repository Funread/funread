from django.shortcuts import render
from ast import Try
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
from folder.models import Folder
from .serializer import FolderSerializer
from sre_parse import State
from turtle import title
from wsgiref import headers
import datetime
import json
import sys
sys.path.append('funread_backend')
import verifyJwt

from django.http import JsonResponse
from django.db import OperationalError

# Create your views here.

@api_view(['POST'])
def new_folder(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'namefolders': request.data.get('nameFolders').lower(),
        'createdBy': request.data.get('createdBy'),
    }
    serializer = FolderSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    folder = Folder.objects.all()
    serializer = FolderSerializer(folder, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteFolder(request, nameFolders):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    folder = Folder.objects.get(namefolders=nameFolders)
    folder.delete()

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def FolderSearch(request, nameFolders):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        folder = Folder.objects.get(namefolders=nameFolders)
        print(folder)
    except Folder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return JsonResponse(
            {"error": "La base de datos no está disponible en este momento."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    serializer = FolderSerializer(folder)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def folderChange(request, nameFolders):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    folder = Folder.objects.get(namefolders=nameFolders)
    serializer = FolderSerializer(folder, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




