from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

class OpenAIChatTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_openai_chat(self):
        response = self.client.post(reverse('openai_chat'), {'prompt': 'Hello, OpenAI!'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('response', response.data)
