from django.shortcuts import render
import json
from wsgiref import headers
from .models import ClassesLog
from .serializers import ClassesLogSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
# Create your views here.

@api_view(['POST'])
def createclasseslog(request):
    data = {
        
        'classesid': request.data.get('classesid'),
        'userid': request.data.get('userid'),
        'createat': request.data.get('createat'),
        'description': request.data.get('description').lower()
        
        }
    serializer = ClassesLogSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"Successfully stored","data":serializer.data}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def listedclasseslog(request):
    classeslog=ClassesLog.objects.all()
    serializer = ClassesLogSerializer(classeslog, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def classeslogchange(request):
    classeslog = ClassesLog.objects.get(classeslogid=request.data.get("classeslogid"))
    data={
        'classesid': request.data.get('classesid'),
        'userid': request.data.get('userid'),
        'createat': request.data.get('createat'),
        'description': request.data.get('description'),
    }
    serializer = ClassesLogSerializer(classeslog, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteclasseslog(request):
    classeslog = ClassesLog.objects.get(classeslogid=request.data.get("classeslogid"))
    classeslog.delete()

    return Response({"msj":"Successfully delete"},status=status.HTTP_200_OK)
