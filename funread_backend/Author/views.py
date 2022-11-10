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

# Create your views here.

#Metodo para mostrar todos los elementos de la lista Roles
@ api_view(['GET'])
def listed(request):
    authorList = AuthorList.objects.all()
    serializer = AuthorListserializer(authorList, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['GET'])
def AuthorListSearch(request, pk):
    try:
        authorList = AuthorList.objects.get(authorlistid=pk)
        print(authorList)
    except AuthorList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AuthorListserializer(authorList)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista Roles
@api_view(['POST'])
def new_Authorlist(request):
    print(request.data)
    data = {
        'iduser': request.data.get('iduser'),
        'idbook': request.data.get('idbook')
    }
    serializer = AuthorListserializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista Roles
@api_view(['DELETE'])
def deleteAuthorList(request, pk):
    authorList = AuthorList.objects.get(authorlistid=pk)
    authorList.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['PUT'])
def AuthorListupdate(request, pk):
    authorList = AuthorList.objects.get(authorlistid=pk)
    serializer = AuthorListserializer(authorList, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    