from django.http import JsonResponse
from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import GroupsPerClasses
from .serializers import GroupsPerClassesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError
# Create your views here.

#Metodo para mostrar todos los elementos de la lista TagsPerPage
@ api_view(['GET'])
def listed(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     groupsPerClasses = GroupsPerClasses.objects.all()
     serializer = GroupsPerClassesSerializer (groupsPerClasses, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Metodo para buscar una variable por nombre
@api_view(['POST'])
def search(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     groupsPerClasses  = GroupsPerClasses.objects.get(groupsperclassesid=request.data.get('groupsPerClassesId'))
     print(groupsPerClasses)
    except GroupsPerClasses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = GroupsPerClassesSerializer(groupsPerClasses)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista SharedBooks
@api_view(['POST'])
def add_new(request):

    #token verification
      try:
         authorization_header = request.headers.get('Authorization')
         verify = verifyJwt.JWTValidator(authorization_header)
         es_valido = verify.validar_token()
         if es_valido==False:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
         print("Datos de la Solicitud:", request.data)
         data = {
         'studentsgroups_id': request.data.get('studentsgroupsId'),
         'classes_id': request.data.get('classesId'),
         }
         print("Datos antes de la serialización:", data)
         serializer = GroupsPerClassesSerializer(data=data)
         if serializer.is_valid():
            print("Los datos son válidos")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
         else:
            print("Los datos no son válidos. Errores:", serializer.errors)

         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

      except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Elimina un elemento de la lista SharedBooks
@api_view(['DELETE'])
def delete(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     groupsPerClasses = GroupsPerClasses.objects.get(groupsperclassesid=request.data.get('groupsPerClassesId'))
     groupsPerClasses.delete()
     return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Metedo que cambia la variable de la lista SharedBooks
@api_view(['PUT'])
def update(request):

    #token verification
   try:
      authorization_header = request.headers.get('Authorization')
      verify = verifyJwt.JWTValidator(authorization_header)
      es_valido = verify.validar_token()
      if es_valido==False:
         return Response(status=status.HTTP_401_UNAUTHORIZED)

      groupsPerClasses  = GroupsPerClasses.objects.get(groupsperclassesid=request.data.get('groupsperclassesid'))
      serializer = GroupsPerClassesSerializer(groupsPerClasses, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
