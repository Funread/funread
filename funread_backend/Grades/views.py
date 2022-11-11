from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Grades
from .serializers import GradeSerializer,GradeChangeSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
#---------------------POST para insertar------------------
@api_view(['POST'])
def creategrade(request):
    data = {
        'booksid': request.data.get('booksid'),
        'progress': request.data.get('progress'),
        'grade': request.data.get('grade'),
        'iduser': request.data.get('iduser'),
        }
    serializer = GradeSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



#---------------------PUT para cambiar------------------
@api_view(['PUT'])
def gradechange(request, booksid):
    grades = Grades.objects.get(booksid=booksid)
    serializer = GradeSerializer(grades, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#---------------------DELETE para eliminar registros------------------
@api_view(['DELETE'])
def deletegrade(request):
    grade=Grades.objects.get(gradesid=request.data.get('gradesid'))
    grade.delete()
    return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)

#---------------------GET para devolver------------------
@api_view(['GET'])
def readgrade(request):
    grade=Grades.objects.all()
    serializer = GradeSerializer(grade, many=True)
    return Response(serializer.data)
