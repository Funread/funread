from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Userroles
from .serializers import UserRolesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt

@api_view(['POST'])
def new_userrole(request):
    
    print(request.data)
    data = {
        'iduser': request.data.get('iduser'),
        'idrole': request.data.get('idrole')
    }
    serializer = UserRolesSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def listAll(request):
    
    userroles = Userroles.objects.all()

    serializer = UserRolesSerializer(userroles, many=True)
    return Response(serializer.data)

