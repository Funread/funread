from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import File
from .serializers import  FileSerializer, FileSerializerFile
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib

# Create your views here.
#----------------Metodo que me devuelve la lista de objetos---------------#
@ api_view(['GET'])
def listed(request):
    file = File.objects.all()
    serializer = FileSerializer(file, many=True)
    return Response(serializer.data)

#-------------------Metodo para eliminar un file------------------------------#
@api_view(['DELETE'])
def deleteFile(request, namefile):
    folder = File.objects.get(namefile=namefile)
    folder.delete()

    return Response(status=status.HTTP_200_OK)

#-------------------Metodo para agregar-----------------------------------------#
@api_view(['POST'])
def new_file(request):
    serializer = FileSerializerFile(data=request.data)
    if serializer.is_valid():
        validated_data=serializer.validated_data
        file = File(**validated_data)
        File.save()

        serializer_response = FileSerializerFile(file)
        return Response(serializer_response.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)