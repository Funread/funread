from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import BooksPerClasses
from .serializers import BooksPerClassesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
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
    
    booksPerClasses = BooksPerClasses.objects.all().exclude(isactive=0)
    serializer = BooksPerClassesSerializer (booksPerClasses, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['POST'])
def listedid(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        Books = BooksPerClasses.objects.filter(classesid= request.data.get('class')).exclude(isactive=0)
    except BooksPerClasses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BooksPerClassesSerializer(Books, many=True)
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
        'booksid': request.data.get('booksid'),
        'classesid': request.data.get('classesid'),
        'order': request.data.get('order'),
        'isactive': "1"
    }
    serializer = BooksPerClassesSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista SharedBooks
@api_view(['PUT'])
def delete(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        Book = BooksPerClasses.objects.get(booksperclasses= request.data.get('booksPerClassesId'))
    except BooksPerClasses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    Book.isactive = 0
    Book.save()
    return Response("group successfully deleted", status=status.HTTP_200_OK)

#Metedo que cambia la variable de la lista SharedBooks
@api_view(['PUT'])
def update(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    booksPerClasses = BooksPerClasses.objects.get(booksperclasses=request.data.get('booksPerClassesId'))
    data={
        'booksid': request.data.get('booksid'),
        'classesid': request.data.get('classesid'),
        'order': request.data.get('order'),
        'isactive': "1"
    }
    serializer = BooksPerClassesSerializer(booksPerClasses, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

