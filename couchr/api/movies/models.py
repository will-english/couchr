from django.db import models

# Create your models here.

class Movie(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def get_api_url(self):
        return reverse("api_movie", kwargs={"pk": self.id})