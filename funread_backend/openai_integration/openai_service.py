from openai import OpenAI

client = OpenAI(api_key=config('OPENAI_API_KEY'))
from django.conf import settings
from decouple import config



def get_grammar_assistance(prompt):
    response = client.chat.completions.create(model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ])
    return response.choices[0].message.content
