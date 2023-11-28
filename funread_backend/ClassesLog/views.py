from django.shortcuts import render
import json
from wsgiref import headers
from .models import ClassesLog
from .serializers import ClassesLogSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError
# Create your views here.

@api_view(['POST'])
def createclasseslog(request):


    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    data = {
        
        'classesid': request.data.get('classesid'),
        'userid': request.data.get('userid'),
        'createdat': request.data.get('createdat'),
        'description': request.data.get('description').lower()
    }

    # Token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = {
            'classesid': request.data.get('classesid'),
            'userid': request.data.get('userid'),
            'createdat': request.data.get('createdat'),
            'description': request.data.get('description').lower()

        }
        serializer = ClassesLogSerializer(data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Successfully stored", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def listedclasseslog(request):

    # Token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    classeslog = ClassesLog.objects.all()
    serializer = ClassesLogSerializer(classeslog, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def classeslogchange(request):

    # Token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        classeslog = ClassesLog.objects.get(classeslogid=request.data.get("classeslogid"))
        data = {
            'classesid': request.data.get('classesid'),
            'userid': request.data.get('userid'),
            'createat': request.data.get('createat'),  # Corregido 'createat' a 'createdat'
            'description': request.data.get('description'),
        }
        serializer = ClassesLogSerializer(classeslog, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def deleteclasseslog(request):

    # Token verification
    try:
        authorization_header = request.headers.get('Authorization')
        verify = verifyJwt.JWTValidator(authorization_header)
        es_valido = verify.validar_token()
        if es_valido == False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    classeslog = ClassesLog.objects.get(classeslogid=request.data.get("classeslogid"))
    classeslog.delete()

    return Response({"msj": "Successfully delete"}, status=status.HTTP_200_OK)

