# Tony was are!
from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Roles #, UserRoles
from .serializers import  RolesSerializer #, UserRolesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError

# Create your views here.

#Metodo para mostrar todos los elementos de la lista Roles
@ api_view(['GET'])
def listed(request):

    #token verification
    try: 
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     role = Roles.objects.all()
     serializer = RolesSerializer(role, many=True)
     return Response(serializer.data)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Metodo para buscar una variable por nombre
@api_view(['GET'])
def RolesSearch(request, role):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     roles = Roles.objects.get(role=role)
     print(roles)
    except Roles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = RolesSerializer(roles)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista Roles
@api_view(['POST'])
def new_role(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     print(request.data)
     data = {
        'role': request.data.get('role').lower(),
     }
     serializer = RolesSerializer(data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Elimina un elemento de la lista Roles
@api_view(['DELETE'])
def deleteRole(request, role):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     role = Roles.objects.get(role=role)
     role.delete()
     return Response(status=status.HTTP_200_OK)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Metodo para mostrar todos los elementos de la lista UserRoles
#@ api_view(['GET'])
#def listedUserRoles(request):

    #token verification
#    authorization_header = request.headers.get('Authorization')
#    verify = verifyJwt.JWTValidator(authorization_header)
#    es_valido = verify.validar_token()
#    if es_valido==False:
#        return Response(status=status.HTTP_401_UNAUTHORIZED)
#    
#    Userrole = UserRoles.objects.all()
#    serializer = UserRolesSerializer(Userrole, many=True)
#    return Response(serializer.data)


#Metodo para agregar un elemento a la lista UserRoles
#@api_view(['POST'])
#def new_Userrole(request):

    #token verification
    #authorization_header = request.headers.get('Authorization')
    #verify = verifyJwt.JWTValidator(authorization_header)
    #es_valido = verify.validar_token()
    #if es_valido==False:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    #print(request.data)
    #data = {
    #    'idrole': request.data.get('idrole'),
    #    'iduser': request.data.get('iduser')
    #}
    #serializer = UserRolesSerializer(data=data)
    #if serializer.is_valid():
    #    serializer.save()
    #    return Response(serializer.data, status=status.HTTP_201_CREATED)
    #return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)



#Metedo que cambia la variable de la lista Roles
@api_view(['PUT'])
def roleupdate(request, role):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     role = Roles.objects.get(role=role)
     serializer = RolesSerializer(role, data=request.data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Elimina un elemento de la lista UserRoles
#@api_view(['DELETE'])
#def deleteUserRole(request, pk):

    #token verification
    #authorization_header = request.headers.get('Authorization')
    #verify = verifyJwt.JWTValidator(authorization_header)
    #es_valido = verify.validar_token()
    #if es_valido==False:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    #idrole = UserRoles.objects.get(userrolesid=pk)
    #idrole.delete()

    #return Response(status=status.HTTP_200_OK)

#---------------------Busca un elemento de userrole por su id-------------------------#
#@api_view(['GET'])
#def UserRolesSearch(request, pk):

    #token verification
    #authorization_header = request.headers.get('Authorization')
    #verify = verifyJwt.JWTValidator(authorization_header)
    #es_valido = verify.validar_token()
    #if es_valido==False:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    #try:
    #    userrole = UserRoles.objects.get(userrolesid=pk)
    #    print(userrole)
    #except UserRoles.DoesNotExist:
    #    return Response(status=status.HTTP_404_NOT_FOUND)
    #serializer = UserRolesSerializer(userrole)
    #return Response(serializer.data, status=status.HTTP_200_OK)



#Metedo que cambia la variable de la lista User Roles
#@api_view(['PUT'])
#def userroleupdate(request, pk):

    #token verification
    #authorization_header = request.headers.get('Authorization')
    #verify = verifyJwt.JWTValidator(authorization_header)
    #es_valido = verify.validar_token()
    #if es_valido==False:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    #userrole = UserRoles.objects.get(userrolesid=pk)
    #serializer = UserRolesSerializer(userrole, data=request.data)
    #if serializer.is_valid():
    #    serializer.save()
    #    return Response(serializer.data, status=status.HTTP_200_OK)
    #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)