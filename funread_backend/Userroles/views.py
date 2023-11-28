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
from .models import User
from .serializers import UserSerializer
from django.db import OperationalError

@api_view(['POST'])
def new_userrole(request):
    
    #token verification
 try:
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
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
 except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def listAll(request):
 try:
    userroles = Userroles.objects.all()

    serializer = UserRolesSerializer(userroles, many=True)
    return Response(serializer.data)
 except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def listedStudents(request):
    try:
        # Token verification
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()     
        if not es_valido:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        active_students = User.objects.filter(actived=1)
        student_roles = Userroles.objects.filter(iduser__in=active_students, idrole=2)

        serializer = UserRolesSerializer(student_roles, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Userroles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)