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
sys.path.append('Se debe poner la ruta de la carpeta funread_backend/funread_backend')
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
        'teacherAssigned': request.data.get('teacherAssigned'),
        'createdAt': datetime.datetime.now(), 
        'lastupdateAt': datetime.datetime.now(),
        }
    serializer = ClassesSerializer(data=data)
    print(serializer)
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
    
    classes=Classes.objects.all()
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
    
    classes = Classes.objects.get(classesId=request.data.get("classesId"))
    data={
        'name': request.data.get('name'),
        'grade': request.data.get('grade'),
        'teacherAssigned': request.data.get('teacherAssigned'),
        'lastupdateAt': datetime.datetime.now(),
    }
    serializer = ClassesSerializer(classes, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteclasses(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    classes = Classes.objects.get(classesId=request.data.get("classesId"))
    classes.delete()

    return Response({"msj":"Successfully delete"},status=status.HTTP_200_OK)