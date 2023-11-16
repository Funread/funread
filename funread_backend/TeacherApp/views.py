from TeacherApp.models import Teachers
from TeacherApp.serializers import TeacherSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import sys
sys.path.append('funread_backend')
import verifyJwt
from django.db import OperationalError

# Create your views here.

@api_view(['GET', 'POST'])
def teacher_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    #token verification
    try:
     authorization_header = request.headers.get('Authorization')
     verify = verifyJwt.JWTValidator(authorization_header)
     es_valido = verify.validar_token()
     if es_valido==False:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
     if request.method == 'GET':
        snippets = Teachers.objects.all()
        serializer = TeacherSerializer(snippets, many=True)
        return Response(serializer.data)

     elif request.method == 'POST':
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT', 'DELETE'])
def teacher_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
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
        snippet = Teachers.objects.get(pk=pk)
    except Teachers.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
     if request.method == 'GET':
        serializer = TeacherSerializer(snippet)
        return Response(serializer.data)

     elif request.method == 'PUT':
        serializer = TeacherSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

     elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except OperationalError:
        return Response({"error": "Error en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)