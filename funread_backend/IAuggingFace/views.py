import os
from django.http import JsonResponse


def pregunta_huggingface(request):
    if request.method == 'POST':
        pregunta = request.POST.get('pregunta', 'Podrias corregir mi ingles?')
        print(f"Pregunta recibida: {pregunta}")  # Log para verificar la pregunta recibida

        prompt = f"""Question: {pregunta}\nAnswer: let's think step by step."""
        print(f"Prompt generado: {prompt}")  # Log para verificar el prompt generado

        # Configurar la API
        token = os.getenv('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')
        print(f"Token: {token}")  # Log para verificar el token

        model_api = InferenceApi( # type: ignore
            repo_id='google/flan-t5-large',
            token=token
        )

        # Realizar la consulta al modelo
        respuesta = model_api(prompt)
        print(f"Respuesta del modelo: {respuesta}")  # Log para verificar la respuesta

        return JsonResponse({'pregunta': pregunta, 'respuesta': respuesta})
