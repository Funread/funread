from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/protegida/',
    ]

    return Response(routes)

class Protegida(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"content": "Esta vista está protegida"})


