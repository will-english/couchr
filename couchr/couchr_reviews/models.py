from django.db import models
from couchr_lists.models import MovieVO
from django.contrib.auth.models import User

# Create your models here.

class Review(models.Model):
    title = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.TextField(unique=False, null=True, blank=True)
    movie = models.ForeignKey(
        MovieVO,
        related_name="reviews",
        on_delete=models.CASCADE,
        null=True,
    )
    user = models.ForeignKey(
        User,
        related_name="reviews",
        on_delete=models.CASCADE,
        null=True,
    )