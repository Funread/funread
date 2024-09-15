# openai_integration/openai_service.py
import openai
from django.conf import settings
from decouple import config

openai.api_key = config('OPENAI_API_KEY')


def get_grammar_assistance(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']
