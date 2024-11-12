from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Avatar

class AvatarCreateViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        # Utiliza el nombre correcto de la ruta 'AvatarCreator'
        self.url = reverse('AvatarCreator')

    def test_create_avatar_success(self):
        """Prueba para verificar la creación exitosa de un avatar"""
        payload = {
            'user_id': 1,
            'avatar_image': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABlElEQVQ4T2NkoBAw4tLPzWXX1N...',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Avatar created successfully')

    def test_create_avatar_with_invalid_data(self):
        """Prueba para verificar la creación de un avatar con datos inválidos"""
        payload = {
            'user_id': '',  # Campo vacío para simular datos inválidos
            'avatar_image': '',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

    def test_api_error_handling(self):
        """Prueba para verificar el manejo de errores de la API"""
        payload = {
            'user_id': 1,
            'avatar_image': 'data:image/png;base64,invalidbase64string',  # Base64 inválido
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_response_with_json_error(self):
        """Prueba para verificar que el error se devuelve en formato JSON"""
        payload = {}  # Datos faltantes
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_save_image_success(self):
        """Prueba para verificar el guardado exitoso de la imagen del avatar"""
        payload = {
            'user_id': 1,
            'avatar_image': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABlElEQVQ4T2NkoBAw4tLPzWXX1N...',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        avatar_count = Avatar.objects.count()
        self.assertEqual(avatar_count, 1)
