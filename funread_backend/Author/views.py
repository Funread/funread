from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import AuthorList
from .serializers import AuthorListserializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt

# Create your views here.

#Metodo para mostrar todos los elementos de la lista Roles
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    authorList = AuthorList.objects.all()
    serializer = AuthorListserializer(authorList, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['GET'])
def AuthorListSearch(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        authorlist = AuthorList.objects.get(authorlistid=request.data.get('authorlistid'))
        print(authorlist)
    except AuthorList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AuthorListserializer(authorlist)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista Roles
@api_view(['POST'])
def new_Authorlist(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    print(request.data)
    data = {
        'userId': request.data.get('userId'),
        'bookId': request.data.get('bookId')
    }
    serializer = AuthorListserializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista Roles
@api_view(['DELETE'])
def deleteAuthorList(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    authorlist = AuthorList.objects.get(authorlistid=request.data.get('authorlistid'))
    authorlist.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['PUT'])
def AuthorListupdate(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    authorlist = AuthorList.objects.get(authorlistid=request.data.get('authorlistid'))
    serializer = AuthorListserializer(authorlist, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)