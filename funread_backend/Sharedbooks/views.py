from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import SharedBooks
from .serializers import  SharedBooksSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib

# Create your views here.

#Metodo para mostrar todos los elementos de la lista SharedBooks
@ api_view(['GET'])
def listed(request):
    sharedBooks = SharedBooks.objects.all()
    serializer = SharedBooksSerializer (sharedBooks, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['POST'])
def search(request):
    print(request)
    try:
        sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
        print(sharedbooks)
    except SharedBooks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = SharedBooksSerializer(sharedbooks)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista SharedBooks
@api_view(['POST'])
def add_new(request):
    print(request.data)
    data = {
        'bookId': request.data.get('bookId'),
        'userId': request.data.get('userId'),
    }
    serializer = SharedBooksSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista SharedBooks
@api_view(['DELETE'])
def delete(request):
    sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
    sharedbooks.delete()
    return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)


#Metedo que cambia la variable de la lista SharedBooks
@api_view(['PUT'])
def update(request):
    sharedbooks = SharedBooks.objects.get(sharedbooksid=request.data.get('sharedbooksid'))
    serializer = SharedBooksSerializer(sharedbooks, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)