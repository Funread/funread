import verifyJwt
import datetime
from sre_parse import State
from turtle import title
from .models import StudentsGroups
from .serializers import StudentsGroupsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import sys
sys.path.append('funread_backend')

# Create your views here.

# Metodo para mostrar todos los elementos de la lista StudentsGroups


@ api_view(['GET'])
def listed(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido == False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    studentsGroups = StudentsGroups.objects.all().exclude(isteacher=1).exclude(isactive=0)
    serializer = StudentsGroupsSerializer(studentsGroups, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def listedPerGroups(request):
    # Token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        groupscreateid = StudentsGroups.objects.filter(groupscreateid=request.data.get('GroupsCreateId')).exclude(isteacher=1).exclude(isactive=0)
    except StudentsGroups.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StudentsGroupsSerializer(groupscreateid,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Metodo para agregar un elemento a la lista StudentsGroups
@api_view(['POST'])
def add_new(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    data = {
        'userid': request.data.get('userid'),
        'isteacher': request.data.get('isteacher'),
        'createdby': request.data.get('createdby'),
        'createdat': datetime.datetime.now(),
        'groupscreateid': request.data.get('groupscreateid'),
        'isactive' : 1
    }
    serializer = StudentsGroupsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response("teacher or student already registered", status=status.HTTP_400_BAD_REQUEST)

# Elimina un elemento de la lista StudentsGroups
@api_view(['PUT'])
def delete(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        Student = StudentsGroups.objects.get(userid= request.data.get('idstudent'))
    except StudentsGroups.DoesNotExist:
        return Response("the student does not exist", status=status.HTTP_404_NOT_FOUND)
    if Student.isteacher == 1:
        return Response("the student does not exist", status=status.HTTP_404_NOT_FOUND)
    Student.isactive = 0
    Student.save()
    return Response("student successfully deleted", status=status.HTTP_200_OK)


# Metedo que cambia la variable de la lista StudentsGroups
@api_view(['PUT'])
def update(request):

    # token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    studentsGroups = StudentsGroups.objects.get(groupId=request.data.get('groupId'))
    serializer = StudentsGroupsSerializer(studentsGroups, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)