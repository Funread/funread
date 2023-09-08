from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import GroupsPerClasses
from .serializers import GroupsPerClassesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('Se debe poner la ruta de la carpeta funread_backend/funread_backend')
import verifyJwt

# Create your views here.

#Metodo para mostrar todos los elementos de la lista TagsPerPage
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    groupsPerClasses = GroupsPerClasses.objects.all()
    serializer = GroupsPerClassesSerializer (groupsPerClasses, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['GET'])
def search(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        groupsPerClasses  = GroupsPerClasses.objects.get(groupsPerClassesId=request.data.get('groupsPerClassesId'))
        print(groupsPerClasses)
    except GroupsPerClasses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = GroupsPerClassesSerializer(groupsPerClasses)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista SharedBooks
@api_view(['POST'])
def add_new(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'groupId': request.data.get('groupId'),
        'classesId': request.data.get('classesId'),
    }
    serializer = GroupsPerClassesSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista SharedBooks
@api_view(['DELETE'])
def delete(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    groupsPerClasses = GroupsPerClasses.objects.get(groupsPerClassesId=request.data.get('groupsPerClassesId'))
    groupsPerClasses.delete()
    return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)


#Metedo que cambia la variable de la lista SharedBooks
@api_view(['PUT'])
def update(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    groupsPerClasses  = GroupsPerClasses.objects.get(groupsPerClassesId=request.data.get('groupsPerClassesId'))
    serializer = GroupsPerClassesSerializer(groupsPerClasses, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)