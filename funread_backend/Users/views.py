
import json
from wsgiref import headers
from Roles.models import Roles
from Roles.serializers import RolesSerializer, RolesUpdatedBySerializer

from Userroles.serializers import UserRolesSerializer
from .models import User 
from Userroles.models import Userroles
from .serializers import UserPasswordSerializer, UserSerializer, UserStatusSerializer, LoginSerializer
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
from django.db.models import Q
from django.core.exceptions import ValidationError
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError



@api_view(['POST'])
def new_user(request):

 try:
    data = {

        'email': request.data.get('email'),
        'name': request.data.get('name'),
        'lastname': request.data.get('lastname'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
        'createdat': datetime.now(),
        'actived': request.data.get('actived'),
        'username': request.data.get('username')

    }
    print(data)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def userSearch(request, email):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
        user = User.objects.get(email=email)
        print(user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def userChange(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
     data = {
        'email': request.data.get('email'),
        'name': request.data.get('name'),
        'lastname': request.data.get('lastname'),
        'username': request.data.get('username')
     }
     serializer = UserSerializer(user, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
  

@api_view(['PUT'])
def userChangePassword(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    try:
     data = {
        'email': request.data.get('email'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
     }
     serializer = UserPasswordSerializer(user, data=data)
     print(serializer)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listed(request):

    #token verification
    
   try: 
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
     user = User.objects.all()
     serializer = UserSerializer(user, many=True)
     return Response(serializer.data)
   except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listed_active(request):

    #token verification
   try: 
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     user = User.objects.filter(actived=1)
     serializer = UserSerializer(user, many=True)
     return Response(serializer.data)
   except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['GET'])
def listed_deactive(request):

    #token verification
   try: 
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     user = User.objects.filter(actived=0)
     serializer = UserSerializer(user, many=True)
     return Response(serializer.data)
   except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def delete_user(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    
    try:
     data = {
        'actived': 0,
     }
     serializer = UserStatusSerializer(user, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
      return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['PUT'])
def activate_user(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    
    try:
     data = {
        'actived': 1,
     }
     serializer = UserStatusSerializer(user, data=data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['POST'])
def login(request):
    try:
     emailSe = request.data.get('email')
     passwordSe = hashlib.sha256(request.data.get(
        'password').encode('utf-8')).hexdigest()
     user = User.objects.filter(email=emailSe).first()
     if user is None:
        raise AuthenticationFailed('User not found')
     if not user.actived.__eq__(1):
        raise AuthenticationFailed('inactive user')
     if not user.password.__eq__(passwordSe):
        raise AuthenticationFailed('Incorrect password')

     signing_key = settings.SIMPLE_JWT['SIGNING_KEY']
     payload = {
        'exp': datetime.utcnow() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        'iat': datetime.utcnow(),
        'user_id': user.userid
     }
     algorithm = settings.SIMPLE_JWT['ALGORITHM']
     token = jwt.encode(payload, signing_key, algorithm)

     roles = Roles.objects.filter(userroles__iduser=user.userid)

     rolesSerializer = RolesSerializer(roles, many=True)
     serializer = LoginSerializer(user)

     response = Response()
     response.data= {
      'jwt': token,
      'data': serializer.data,
      'roles': rolesSerializer.data
      }
     return response
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ api_view(['POST'])
def tokenVerify(request):
    #token verification
 try:
    response = Response()
    

    authorization_header = request.headers.get('Authorization')
    verify = verifyJwt.JWTValidator(authorization_header)
    es_valido = verify.validar_token()
    if es_valido==False:
        response.data= {'login':False}
    else:
        response.data= {'login':True}

    return response
 except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def usercompleteSearch(request):

    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    try:
        user = User.objects.filter(Q(lastname=request.data.get('user')) | Q(email=request.data.get('user')) | Q(name=request.data.get('user')) | Q(username=request.data.get('user')))
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    if len(user) == 0:
        try:
            user = User.objects.filter(userid=request.data.get('user'))
        except (ValueError, ValidationError):
             return Response(status=status.HTTP_404_NOT_FOUND)
        except OperationalError:
         return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)