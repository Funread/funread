from django.shortcuts import render
from ast import Try
import re
from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import hashlib
from Tags.models import Tags
from .serializer import TagsSerializer
from sre_parse import State
from turtle import title
from wsgiref import headers
import datetime
import json

# Create your views here.

@api_view(['POST'])
def new_tags(request):
    print(request.data)
    data = {
        'description': request.data.get('description'),
    }
    serializer = TagsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):
    folder = Tags.objects.all()
    serializer = TagsSerializer(folder, many=True)
    return Response(serializer.data)