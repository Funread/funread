from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AudioTranscription
from .serializers import AudioTranscriptionSerializer

class AudioTranscriptionView(APIView):
    def get(self, request):
        transcriptions = AudioTranscription.objects.all()
        serializer = AudioTranscriptionSerializer(transcriptions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AudioTranscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
