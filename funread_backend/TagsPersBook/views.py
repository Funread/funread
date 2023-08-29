from django.shortcuts import render
import json
from wsgiref import headers
from .models import TagsPerBook
from .serializer import TagsPerBookSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
# Create your views here.

@api_view(['POST'])
def createtagsperbook(request):
    data = {
        
        'tagsid': request.data.get('tagsid'),
        'bookid': request.data.get('bookid'),
        
        }
    serializer = TagsPerBookSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"Successfully stored","data":serializer.data}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listedtagsperbook(request):
    tagsPerBook=TagsPerBook.objects.all()
    serializer = TagsPerBookSerializer(tagsPerBook, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def tagsperbookChange(request):
    tagsPerBook = TagsPerBook.objects.get(tagsperbookid=request.data.get("tagsperbookid"))
    data={
        "tagsid":request.data.get("tagschange"),
        "bookid":request.data.get("bookchange"),
    }
    serializer = TagsPerBookSerializer(tagsPerBook, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deletetagsperbook(request):
    tagsperbook = TagsPerBook.objects.get(tagsperbookid=request.data.get("tagsperbookid"))
    tagsperbook.delete()

    return Response({"msj":"Successfully delete"},status=status.HTTP_200_OK)




