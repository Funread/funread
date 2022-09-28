import json
from turtle import title
from wsgiref import headers
from .models import Book
from .serializers import BookSerializer, BookUpdatedBySerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib

@api_view(['POST'])
def new_user(request):

    data = {

        'title': request.data.get('title'),
        'category': request.data.get('category'),
        'portrait': request.data.get('lastname'),
        'createdBy': request.data.get('createdBy'),
        'createdAt': request.data.get('createdat'),
        'updatedBy': request.data.get('updatedBy'),
        'updatedAt': request.data.get('updatedAt'),
        'state' : request.data.get('state' ),
        'sharedBook' : request.data.get('sharedBook'),

    }
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def bookSearch(request, bookid):
    try:
        book = Book.objects.get(bookid=bookid)
        print(book)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def userChange(request):

    try:
        dataRequest = {
            'title': request.data.get('title'),
        }
        titleSe = dataRequest.get('title')
        print(titleSe)
        user = Book.objects.get(title=titleSe)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = {
        'tile': request.data.get('title'),
        'portrait': request.data.get('portrait'),
        'category': request.data.get('category'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
    }
    serializer = BookSerializer(book, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


