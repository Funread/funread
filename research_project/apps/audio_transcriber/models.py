from django.db import models

class AudioTranscription(models.Model):
    title = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='audio_files/')
    transcription = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
