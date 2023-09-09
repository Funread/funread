from django.shortcuts import render
from ast import Try
import re
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
from Tags.models import Tags
from .serializer import TagsSerializer
from sre_parse import State
from turtle import title
from wsgiref import headers
import datetime
import json
import sys
sys.path.append('funread_backend')
import verifyJwt


# Create your views here.

#--------------------------Method POST------------------------------------#

@api_view(['POST'])
def new_tags(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'description': request.data.get('description').lower(),
    }
    serializer = TagsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#-------------------Method GET------------------------------------------------#
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    folder = Tags.objects.all()
    serializer = TagsSerializer(folder, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def tagsSearch(request, description):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        tags = Tags.objects.get(description=description)
        print(Tags)
    except Tags.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = TagsSerializer(tags)
    return Response(serializer.data, status=status.HTTP_200_OK)

#-----------------------Metodo PUT----------------------------------#
@api_view(['PUT'])
def tagsChange(request, description):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    file = Tags.objects.get(description=description)
    serializer = TagsSerializer(file, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)