from django.shortcuts import render
from ast import Try
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
from folder.models import Folder
from .serializer import FolderSerializer
from sre_parse import State
from turtle import title
from wsgiref import headers
import datetime
import json

# Create your views here.

@api_view(['POST'])
def new_folder(request):
    print(request.data)
    data = {
        'nameFolders': request.data.get('nameFolders'),
        'createdBy': request.data.get('createdBy'),
    }
    serializer = FolderSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):
    folder = Folder.objects.all()
    serializer = FolderSerializer(folder, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteFolder(request, nameFolders):
    folder = Folder.objects.get(nameFolders=nameFolders)
    folder.delete()

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def FolderSearch(request, nameFolders):
    try:
        folder = Folder.objects.get(nameFolders=nameFolders)
        print(folder)
    except Folder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FolderSerializer(folder)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def folderChange(request, nameFolders):
    folder = Folder.objects.filter(nameFolders=nameFolders).first()
    serializer = FolderSerializer(folder, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




