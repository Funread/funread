from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Grades
from .serializers import GradeSerializer,GradeChangeSerializer
from rest_framework.response import Response
from rest_framework import status
import sys
sys.path.append('Se debe poner la ruta de la carpeta funread_backend/funread_backend')
import verifyJwt

# Create your views here.
#---------------------POST para insertar------------------
@api_view(['POST'])
def creategrade(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
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

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    grades = Grades.objects.get(booksid=booksid)
    serializer = GradeSerializer(grades, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#---------------------DELETE para eliminar registros------------------
@api_view(['DELETE'])
def deletegrade(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    grade=Grades.objects.get(gradesid=request.data.get('gradesid'))
    grade.delete()
    return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)

#---------------------GET para devolver------------------
@api_view(['GET'])
def readgrade(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    grade=Grades.objects.all()
    serializer = GradeSerializer(grade, many=True)
    return Response(serializer.data)
