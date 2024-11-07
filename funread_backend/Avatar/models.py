
from django.db import models

class Avatar(models.Model):
    SKIN_TONE_CHOICES = [
        ('light', 'Light'),
        ('medium', 'Medium'),
        ('dark', 'Dark'),
    ]
    
    HAIR_COLOR_CHOICES = [
        ('blonde', 'Blonde'),
        ('brown', 'Brown'),
        ('black', 'Black'),
        ('red', 'Red'),
    ]

    skin_tone = models.CharField(max_length=10, choices=SKIN_TONE_CHOICES, default='medium')
    hair_color = models.CharField(max_length=10, choices=HAIR_COLOR_CHOICES, default='brown')
    accessory = models.CharField(max_length=50, blank=True, null=True)  # Ej. 'sombrero', 'gafas'
    image_url = models.URLField(blank=True, null=True)  # URL de la imagen generada
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Avatar con piel {self.skin_tone}, pelo {self.hair_color} y accesorio {self.accessory}"
