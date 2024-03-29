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
from django.db import OperationalError
from django.http import JsonResponse
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
    try:
        print(request.data)
        data = {
            'description': request.data.get('description'),
            'descriptionn': request.data.get('descriptionn')
        }
        serializer = TagsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


#-------------------Method GET------------------------------------------------#
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        folder = Tags.objects.all()
        serializer = TagsSerializer(folder, many=True)
        return Response(serializer.data)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


@api_view(['GET'])
def tagsSearch(request, description):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        try:
            tags = Tags.objects.get(description=description)
            print(Tags)
        except Tags.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TagsSerializer(tags)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


#-----------------------Metodo PUT----------------------------------#
@api_view(['PUT'])
def tagsChange(request, description):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        file = Tags.objects.get(description=description)
        serializer = TagsSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)
