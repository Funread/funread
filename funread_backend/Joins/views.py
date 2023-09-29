
import json
from wsgiref import headers
from .models import Joins 
from .serializers import JoinSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib
#from Roles.models import UserRoles 
#from Roles.serializers import UserRolesSerializer
import jwt
from rest_framework.exceptions import AuthenticationFailed
import datetime
from datetime import datetime
from django.conf import settings
import sys
sys.path.append('funread_backend')
import verifyJwt

@api_view(['POST'])
def newJoin(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    data = {

        'password': request.data.get('password'),
        #'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
        'bookid': request.data.get('bookid'),
        'classesid': request.data.get('classesid')

    }
    print(data)
    serializer = JoinSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):

    #token verification
    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    book = Joins.objects.all()
    serializer = JoinSerializer(book, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def searchCode(request,code):
    
    try:
        join = Joins.objects.get(joinid=code)
        print(join)
    except Joins.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) # devolvemos status de 404 si el join no existe
    return Response(status=status.HTTP_204_NO_CONTENT) # devovlemos status 204 si existe, ay que no necesitamos responder con datos

@ api_view(['POST'])
def checkJoin(request):

    code = request.data.get('code')
    password = request.data.get('password')
    #passwordSe = hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest()
    join = Joins.objects.filter(joinid=code).first()
    if join is None:
        raise AuthenticationFailed('Join not found')
    if not join.password.__eq__(password):
        raise AuthenticationFailed('Incorrect password')

    signing_key = settings.SIMPLE_JWT['SIGNING_KEY']
    payload = {
        'exp': datetime.utcnow() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        'iat': datetime.utcnow(),
        'join_id': join.joinid
    }
    algorithm = settings.SIMPLE_JWT['ALGORITHM']
    token = jwt.encode(payload, signing_key, algorithm)

    serializer = JoinSerializer(join)
    #return Response(serializer.data, status=status.HTTP_200_OK)

    response = Response()
    response.data= {
      'jwt': token,
      'data': serializer.data
    }
    return response

    return Response(status=status.HTTP_204_NO_CONTENT)