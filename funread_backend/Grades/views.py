from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from .models import Grades
from .serializers import GradeSerializer
from rest_framework.response import Response
from rest_framework import status
import sys
sys.path.append('funread_backend')
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
        'userid': request.data.get('iduser'),
        'isactive': 1
        }
    serializer = GradeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



#---------------------PUT para cambiar------------------
@api_view(['PUT'])
def gradechange(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    # grades = Grades.objects.get(booksid=booksid)
    # serializer = GradeSerializer(grades, data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    try:
        dataRequest = {
            'idgrade': request.data.get('idgrade'),
        }
        idgrade = dataRequest.get('idgrade')
        grade = Grades.objects.get(gradesid=idgrade)
    except Grades.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    bookid = grade.booksid.pk
    userid = grade.userid.pk
    if request.data.get('bookid') is not None:
        bookid = request.data.get('bookid')
    if request.data.get('userid') is not None:
        userid = request.data.get('userid')
    data = {
        'booksid': bookid,
        'progress': request.data.get('progress'),
        'grade': request.data.get('grade'),
        'userid': userid,
        'isactive': '1'
    }
    print(data)
    serializer = GradeSerializer(grade, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#---------------------DELETE para eliminar registros------------------
# @api_view(['DELETE'])
# def deletegrade(request):

#     #token verification
#     authorization_header = request.headers.get('Authorization')
#     verify = verifyJwt.JWTValidator(authorization_header)
#     es_valido = verify.validar_token()
#     if es_valido==False:
#         return Response(status=status.HTTP_401_UNAUTHORIZED)
    
#     grade=Grades.objects.get(gradesid=request.data.get('gradesid'))
#     grade.delete()
#     return Response({"msj":"Succesfully deleted"}, status=status.HTTP_200_OK)

#---------------------GET para devolver------------------
@api_view(['GET'])
def readgrade(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    grade=Grades.objects.all().exclude(isactive=0)
    serializer = GradeSerializer(grade, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def readgradeid(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    # grade=Grades.objects.all().exclude(isactive=0)
    # serializer = GradeSerializer(grade, many=True)
    # return Response(serializer.data)
    try:
        GradesInst = Grades.objects.filter(userid= request.data.get('student')).exclude(isactive=0)
    except Grades.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = GradeSerializer(GradesInst, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@ api_view(['PUT'])
def deletegrade(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        Grade = Grades.objects.get(gradesid= request.data.get('idgrade'))
    except Grades.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    Grade.isactive = 0
    Grade.save()
    return Response("group successfully deleted", status=status.HTTP_200_OK)
