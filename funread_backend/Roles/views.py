from django.shortcuts import render
import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import Roles, UserRoles
from .serializers import  RolesSerializer, UserRolesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib

# Create your views here.

#_______________________________________Roles____________________________________________________

#Metodo para mostrar todos los elementos de la lista Roles
@ api_view(['GET'])
def listedRoles(request):
    role = Roles.objects.all()
    serializer = RolesSerializer(role, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['POST'])
def searchRoles(request):
    print(request)
    try:
        roles = Roles.objects.get(rolesid=request.data.get('rolesid'))
        print(roles)
    except Roles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = RolesSerializer(roles)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista Roles
@api_view(['POST'])
def newRole(request):
    print(request.data)
    data = {
        'role': request.data.get('role').lower(),
    }
    serializer = RolesSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista Roles
@api_view(['DELETE'])
def deleteRole(request):
    roles = Roles.objects.get(rolesid=request.data.get('rolesid'))
    roles.delete()
    return Response(status=status.HTTP_200_OK)

#Metedo que cambia la variable de la lista Roles
@api_view(['PUT'])
def updateRole(request):
    roles = Roles.objects.get(rolesid=request.data.get('rolesid'))
    serializer = RolesSerializer(roles, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#_______________________________________UserRoles____________________________________________________

#Metodo para mostrar todos los elementos de la lista UserRoles
@ api_view(['GET'])
def listedUserRoles(request):
    Userrole = UserRoles.objects.all()
    serializer = UserRolesSerializer(Userrole, many=True)
    return Response(serializer.data)

#Busca un elemento de userrole por su id#
@api_view(['POST'])
def UserRolesSearch(request):
    print(request)
    try:
        userroles = UserRoles.objects.get(userrolesid=request.data.get('userrolesid'))
        print(userroles)
    except UserRoles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserRolesSerializer(userroles)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista UserRoles
@api_view(['POST'])
def new_Userrole(request):
    print(request.data)
    data = {
        'idrole': request.data.get('idrole'),
        'iduser': request.data.get('iduser')
    }
    serializer = UserRolesSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista UserRoles
@api_view(['DELETE'])
def deleteUserRole(request):
    userroles = UserRoles.objects.get(userrolesid=request.data.get('userrolesid'))
    userroles.delete()

    return Response(status=status.HTTP_200_OK)


#Metedo que cambia la variable de la lista User Roles
@api_view(['PUT'])
def userroleupdate(request):
    userroles = UserRoles.objects.get(userrolesid=request.data.get('userrolesid'))
    serializer = UserRolesSerializer(userroles, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




