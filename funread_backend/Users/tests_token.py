from django.test import TestCase, Client
from .models import User
from datetime import datetime, timezone
import hashlib
import json
import base64


def _decode_jwt_no_verify(token):
    # decode payload without verifying signature
    parts = token.split('.')
    if len(parts) < 2:
        return {}
    payload = parts[1]
    # add padding
    rem = len(payload) % 4
    if rem > 0:
        payload += '=' * (4 - rem)
    data = base64.urlsafe_b64decode(payload.encode('utf-8'))
    return json.loads(data.decode('utf-8'))


class JWTExpirationTests(TestCase):
    def setUp(self):
        self.client = Client()
        pwd = 'Password123'
        hashed = hashlib.sha256(pwd.encode('utf-8')).hexdigest()
        self.user = User.objects.create(email='test@example.com', username='testuser', password=hashed, actived=1)
        self.raw_password = pwd

    def test_jwt_expiration_is_approx_six_hours(self):
        # login
        resp = self.client.post('/users/login/', data={'email': 'test@example.com', 'password': self.raw_password}, content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn('jwt', data)
        token = data['jwt']
        payload = _decode_jwt_no_verify(token)
        self.assertIn('exp', payload)
        self.assertIn('iat', payload)
        # exp and iat are unix timestamps (seconds)
        exp = int(payload['exp'])
        iat = int(payload.get('iat', 0))
        # difference should be roughly 6 hours (21600 seconds)
        diff = exp - iat
        self.assertTrue(abs(diff - 21600) <= 600, f"Token TTL expected ~21600s but got {diff}s")
