import json
from wsgiref import headers
from .models import User
from .serializers import UserPasswordSerializer, UserSerializer, UserStatusSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import hashlib


@api_view(['POST'])
def new_user(request):

    data = {

        'email': request.data.get('email'),
        'name': request.data.get('name'),
        'lastname': request.data.get('lastname'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
        'createdat': request.data.get('createdat'),
        'actived': request.data.get('actived'),

    }
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def userSearch(request, email):
    try:
        user = User.objects.get(email=email)
        print(user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def userChange(request):

    try:
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = {
        'email': request.data.get('new_email'),
        'name': request.data.get('name'),
        'lastname': request.data.get('lastname'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
    }
    serializer = UserSerializer(user, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def userChangePassword(request):

    try:
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

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


@ api_view(['GET'])
def listed(request):

    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
def listed_active(request):

    user = User.objects.filter(actived=1)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
def listed_deactive(request):

    user = User.objects.filter(actived=0)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def delete_user(request):

    try:
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = {
        'actived': 0,
    }
    serializer = UserStatusSerializer(user, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def activate_user(request):

    try:
        dataRequest = {
            'email': request.data.get('email'),
        }
        emailSe = dataRequest.get('email')
        print(emailSe)
        user = User.objects.get(email=emailSe)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = {
        'actived': 1,
    }
    serializer = UserStatusSerializer(user, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
def login(request):

    data = {
        'email': request.data.get('email'),
        'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
    }

    print(data.get('email'))
    print(data.get('password'))
    emailSe = data.get('email')
    passwordSe = data.get('password')

    try:
        user = User.objects.get(email=emailSe, password=passwordSe, actived=1)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = LoginSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
