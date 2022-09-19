from email import header
import email
from wsgiref import headers
from .models import User
from .serializers import UserSerializer, UserStatusSerializer,LoginSerializer
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


@api_view(['GET', 'PUT', 'DELETE'])
def user_change_search(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        data = {
            'email': request.data.get('email'),
            'name': request.data.get('name'),
            'lastname': request.data.get('lastname'),
            'password': hashlib.sha256(request.data.get('password').encode('utf-8')).hexdigest(),
        }
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ api_view(['GET'])
def listed(request):

    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def delete_user(request, pk):

    try:
        user = User.objects.get(pk=pk)
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


@ api_view(['GET'])
def list(request):

    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def login(request,pk,email):

    try:
        user = User.objects.get(pk=pk,email=email)
        print(user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    
    serializer = LoginSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
