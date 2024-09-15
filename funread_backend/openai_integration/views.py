# openai_integration/views.py
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .openai_service import get_grammar_assistance
import json

@method_decorator(csrf_exempt, name='dispatch')
class GrammarAssistantView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        prompt = data.get('prompt', '')

        if not prompt:
            return JsonResponse({'error': 'No prompt provided'}, status=400)

        try:
            response_text = get_grammar_assistance(prompt)
            return JsonResponse({'response': response_text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
