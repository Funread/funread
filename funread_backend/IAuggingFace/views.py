from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
from huggingface_hub.inference_api import InferenceApi

# Token directamente en el código (no recomendado para producción)
HUGGINGFACE_TOKEN = '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'

@csrf_exempt
def pregunta_huggingface(request):
    if request.method == 'POST':
        pregunta = request.POST.get('pregunta', 'Podrias corregir mi ingles?')

        prompt = f"""Question: {pregunta}\nAnswer: let's think step by step."""

        # Configurar la API
        model_api = InferenceApi(
            repo_id='google/flan-t5-large',
            token=HUGGINGFACE_TOKEN
        )

        # Realizar la consulta al modelo
        try:
            respuesta = model_api(prompt)
            return JsonResponse({'pregunta': pregunta, 'respuesta': respuesta})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # Manejar el caso para métodos distintos a POST
    return HttpResponseBadRequest("Invalid request method. Please use POST.")
