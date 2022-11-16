from django.shortcuts import render
import json
from wsgiref import headers
from .models import Classes
from .serializer import ClassesSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
# Create your views here.

@api_view(['POST'])
def createclasses(request):
    data = {
        
        'name': request.data.get('name'),
        'grade': request.data.get('grade'),
        'teacherassigned': request.data.get('teacherassigned'),
        'createdat': request.data.get('createdat'),
        'lastupdateat': request.data.get('lastupdateat'),
        }
    serializer = ClassesSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"Successfully stored","data":serializer.data}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listedclasses(request):
    classes=Classes.objects.all()
    serializer = ClassesSerializer(classes, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def classesChange(request):
    classes = Classes.objects.get(classesid=request.data.get("classesid"))
    data={
        'name': request.data.get('name'),
        'grade': request.data.get('grade'),
        'teacherassigned': request.data.get('teacherassigned'),
        'createdat': request.data.get('createdat'),
        'lastupdateat': request.data.get('lastupdateat'),
    }
    serializer = ClassesSerializer(classes, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteclasses(request):
    classes = Classes.objects.get(classesid=request.data.get("classesid"))
    classes.delete()

    return Response({"msj":"Successfully delete"},status=status.HTTP_200_OK)
