import datetime
import json
from sre_parse import State
from turtle import title
from wsgiref import headers
from .models import StudentsGroups
from .serializers import StudentsGroupsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib

# Create your views here.

#Metodo para mostrar todos los elementos de la lista StudentsGroups
@ api_view(['GET'])
def listed(request):
    studentsGroups = StudentsGroups.objects.all()
    serializer = StudentsGroupsSerializer (studentsGroups, many=True)
    return Response(serializer.data)

#Metodo para buscar una variable por nombre
@api_view(['GET'])
def search(request):
    try:
        studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
        print(studentsGroups)
    except StudentsGroups.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StudentsGroupsSerializer(studentsGroups)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Metodo para agregar un elemento a la lista StudentsGroups
@api_view(['POST'])
def add_new(request):
    print(request.data)
    data = {
        'userId': request.data.get('userId'),
        'isTeacher': request.data.get('isTeacher'),
        'createdBy': request.data.get('createdBy'),
        'createdAt': datetime.datetime.now(), 
    }
    serializer = StudentsGroupsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#Elimina un elemento de la lista StudentsGroups
@api_view(['DELETE'])
def delete(request):
    studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
    studentsGroups.delete()
    return Response({"msj":"Succesfully Deleted"}, status=status.HTTP_200_OK)


#Metedo que cambia la variable de la lista StudentsGroups
@api_view(['PUT'])
def update(request):
    studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
    serializer = StudentsGroupsSerializer(studentsGroups, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
