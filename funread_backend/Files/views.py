from django.shortcuts import render
from django.shortcuts import render
from ast import Try
import re
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
from Files.models import File
from .serializer import FileSerializer
from sre_parse import State
from turtle import title
from wsgiref import headers
import datetime
import json

# Create your views here.

@api_view(['POST'])
def new_file(request):

    data = {

        'namefile ': request.data.get('namefile'),
        'fileLocation': request.data.get('fileLocation'),
        'idFolders': request.data.get('idFolders'),
        'uploadBy': request.data.get('uploadBy'),
        'idTags': request.data.get('idTags'),

    }
    serializer = FileSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):
    file = File.objects.all()
    serializer = FileSerializer(file, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deletefile(request, namefile):
    folder = File.objects.get(namefile=namefile)
    folder.delete()
    return Response(status=status.HTTP_200_OK)

