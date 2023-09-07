from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import openai
import json
from django.http import HttpResponse
from googletrans import Translator
from django.http import JsonResponse

# APIs de GOOGLE


@api_view(['GET'])
def google_translate(request):
    text_to_translate = request.GET.get(
        'text', 'Esto es una prueba de implementar un traductor en FUNREAD')
    target_language = request.GET.get('target_language', 'en')
    translator = Translator()
    translation = translator.translate(text_to_translate, dest=target_language)
    translated_text = translation.text
    return JsonResponse({'translated_text': translated_text})



# OpenAI
@api_view(['GET'])
def traslateToInglish(request):
    openai.api_key = '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'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "i want you respond me only in spanish"},
                {"role": "system", "content": "Por supuesto, estaré encantado de responder en español. ¿En qué puedo ayudarte hoy?"},
                {"role": "user", "content": "quiero que cuando me respondas solo lo hagas con la respuesta, no des explicaciones si no son necesarias"},
                {"role": "system", "content": "Entendido, responderé tus preguntas sin dar explicaciones innecesarias. Adelante."},
                {"role": "user", "content": "traduce 'esto es una prueba de traduccion automatica' a ingles"}
            ]
        )
    except ValueError:
        response = ValueError

    return Response(response['choices'][0]['message']['content'], status=status.HTTP_201_CREATED)


@api_view(['POST'])
def textGenerator(request):
    jd = json.loads(request.body)
    openai.api_key = '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'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "i want you respond me only in spanish"},
                {"role": "system", "content": "Por supuesto, estaré encantado de responder en español. ¿En qué puedo ayudarte hoy?"},
                {"role": "user", "content": "quiero que cuando me respondas solo lo hagas con la respuesta, no des explicaciones si no son necesarias"},
                {"role": "system", "content": "Entendido, responderé tus preguntas sin dar explicaciones innecesarias. Adelante."},
                {"role": "user", "content": jd['text']}
            ]
        )
    except ValueError:
        response = ValueError

    return Response(response['choices'][0]['message']['content'], status=status.HTTP_201_CREATED)


@api_view(['POST'])
def redaccionAsistent(request):

    jd = json.loads(request.body)
    openai.api_key = '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'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "i want you respond me only in spanish"},
                {"role": "system", "content": "Por supuesto, estaré encantado de responder en español. ¿En qué puedo ayudarte hoy?"},
                {"role": "user", "content": "quiero que cuando me respondas solo lo hagas con la respuesta, no des explicaciones si no son necesarias"},
                {"role": "system", "content": "Entendido, responderé tus preguntas sin dar explicaciones innecesarias. Adelante."},
                {"role": "user",
                    "content": "mejora y corrige el siguiente texto '" + jd['text']+"'"}
            ]
        )
    except ValueError:
        response = ValueError

    return Response(response['choices'][0]['message']['content'], status=status.HTTP_201_CREATED)


@api_view(['GET'])
def ideaGenerator(request):
    openai.api_key = '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'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "i want you respond me only in spanish"},
                {"role": "system", "content": "Por supuesto, estaré encantado de responder en español. ¿En qué puedo ayudarte hoy?"},
                {"role": "user", "content": "quiero que cuando me respondas solo lo hagas con la respuesta, no des explicaciones si no son necesarias"},
                {"role": "system", "content": "Entendido, responderé tus preguntas sin dar explicaciones innecesarias. Adelante."},
                {"role": "user", "content": "necesito enseñarle a niños de 10 años acerca del verbo 'to be', como podria hacerlo"}
            ]
        )
    except ValueError:
        response = ValueError

    return Response(response['choices'][0]['message']['content'], status=status.HTTP_201_CREATED)


@api_view(['GET'])
def imageGenerator(request):
    openai.api_key = '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'
    try:
        response = openai.Image.create(
            prompt="a baby panda",
            n=1,
            size="256x256"
        )
    except ValueError:
        response = ValueError

    return Response(response, status=status.HTTP_201_CREATED)
