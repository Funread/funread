import verifyJwt
import datetime
import json
from django.core.exceptions import ValidationError
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import StudentsGroups
from .serializers import StudentsGroupsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db import IntegrityError
import hashlib
import sys
sys.path.append('funread_backend')

# Create your views here.

# Metodo para mostrar todos los elementos de la lista StudentsGroups


@ api_view(['GET'])
def listed(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    studentsGroups = StudentsGroups.objects.all()
    serializer = StudentsGroupsSerializer(studentsGroups, many=True)
    return Response(serializer.data)

# Metodo para buscar una variable por nombre
# @api_view(['GET'])
# def searchStudents(request):

    # token verification
#    authorization_header = request.headers.get('Authorization')
#    verify = verifyJwt.JWTValidator(authorization_header)
#    es_valido = verify.validar_token()
#    if es_valido==False:
#        return Response(status=status.HTTP_401_UNAUTHORIZED)

#    try:
#        studentsGroups = StudentsGroups.objects.filter(groupscreateid=request.data.get('GroupsCreateId')).exclude(isteacher=1)
#        print(studentsGroups)
#    except StudentsGroups.DoesNotExist:
#        return Response(status=status.HTTP_404_NOT_FOUND)
#    except (ValueError, ValidationError):
#        return Response(status=status.HTTP_400_BAD_REQUEST)
#    if len(studentsGroups) == 0:
#        return Response(status=status.HTTP_404_NOT_FOUND)
#    serializer = StudentsGroupsSerializer(studentsGroups, many=True)
#    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchStudents(request, groupscreateid):
def searchStudents(request, studentsgroupsid):
    # Token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        groupscreateid = StudentsGroups.objects.filter(groupscreateid=groupscreateid)
    except StudentsGroups.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = StudentsGroupsSerializer(groupscreateid,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Metodo para agregar un elemento a la lista StudentsGroups
@api_view(['POST'])
def add_new(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    # print(request.data)
    data = {
        'userid': request.data.get('userid'),
        'isteacher': request.data.get('isteacher'),
        'createdby': request.data.get('createdby'),
        'createdat': datetime.datetime.now(),
        'groupscreateid': request.data.get('groupscreateid'),
    }
    serializer = StudentsGroupsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response("teacher or student already registered", status=status.HTTP_400_BAD_REQUEST)

# Elimina un elemento de la lista StudentsGroups
@api_view(['DELETE'])
def delete(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
    studentsGroups.delete()
    return Response({"msj":"Succesfully Deleted"}, status=status.HTTP_200_OK)


# Metedo que cambia la variable de la lista StudentsGroups
@api_view(['PUT'])
def update(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
    serializer = StudentsGroupsSerializer(studentsGroups, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
