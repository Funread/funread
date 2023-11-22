from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import SharedBooks
from .serializers import  SharedBooksSerializer
from django.db import OperationalError
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt

# Create your views here.

#Metodo para mostrar todos los elementos de la lista SharedBooks
@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        sharedBooks = SharedBooks.objects.all()
        serializer = SharedBooksSerializer (sharedBooks, many=True)
        return Response(serializer.data)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


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
        try:
            sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
            print(sharedbooks)
        except SharedBooks.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SharedBooksSerializer(sharedbooks)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


#Metodo para agregar un elemento a la lista SharedBooks
@api_view(['POST'])
def add_new(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:

        
        print(request.data)

        book_id = request.data.get('bookid')
        user_id = request.data.get('userid')

        print(f"bookid: {book_id}, bookid: {user_id}")
        data = {
            'bookid': request.data.get('bookid'),
            'userid': request.data.get('userid'),
        }
        serializer = SharedBooksSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


#Elimina un elemento de la lista SharedBooks
@api_view(['DELETE'])
def delete(request):
    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
        sharedbooks.delete()
        return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)
    except SharedBooks.DoesNotExist:
       return Response({"error": "El objeto no existe."}, status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)


#Metedo que cambia la variable de la lista SharedBooks
@api_view(['PUT'])
def update(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
        serializer = SharedBooksSerializer(sharedbooks, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
       return JsonResponse({"error": "La base de datos no está disponible en este momento. Intentelo de nuevo más tarde."},status=status.HTTP_503_SERVICE_UNAVAILABLE)
