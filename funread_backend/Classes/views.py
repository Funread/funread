from django.shortcuts import render
import json
from wsgiref import headers
from .models import Classes
from .serializers import ClassesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import datetime
import sys
sys.path.append('funread_backend')
import verifyJwt
# Create your views here.

@api_view(['POST'])
def createclasses(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    data = {
        
        'name': request.data.get('name'),
        'grade': request.data.get('grade'),
        'teacherassigned': request.data.get('teacherAssigned'),
        'createdat': datetime.datetime.now(), 
        'lastupdateat': datetime.datetime.now(),
        'startdate': request.data.get('startdate'),
        'finishdate': request.data.get('finishdate'),
        'groupscreateid': request.data.get('groupscreateid'),
        'isactive' : 1
        }
    print(data)
    serializer = ClassesSerializer(data=data)
    #print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"Successfully stored","data":serializer.data}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listedclasses(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    classes=Classes.objects.all().exclude(isactive=0)
    serializer = ClassesSerializer(classes, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def classesChange(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    classes = Classes.objects.get(classesid=request.data.get("classesId"))
    data={
        'name': request.data.get('name'),
        'grade': request.data.get('grade'),
        'teacherassigned': request.data.get('teacherAssigned'),
        'createdat': classes.createdat,
        'lastupdateat': datetime.datetime.now(),
        'startdate': request.data.get('startdate'),
        'finishdate': request.data.get('finishdate'),
        'groupscreateid': request.data.get('groupscreateid'),
        'isactive' : 1
    }
    serializer = ClassesSerializer(classes, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def deleteclasses(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        Class = Classes.objects.get(classesid= request.data.get('classesId'))
    except Classes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    Class.isactive = 0
    Class.save()
    return Response("group successfully deleted", status=status.HTTP_200_OK)

@api_view(['POST'])
def listedclassesid(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        ClassesGet = Classes.objects.filter(groupscreateid= request.data.get('group')).exclude(isactive=0)
    except Classes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClassesSerializer(ClassesGet, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)