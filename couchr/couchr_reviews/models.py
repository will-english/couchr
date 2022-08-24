from django.db import models
from couchr_lists.models import MovieVO

# Create your models here.

# We will use the user model once auth all figured out

# class User(models.Model):
#     user_id = models.CharField(max_length=100, unique=False, null=True, blank=True)

class Review(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.TextField(unique=False, null=True, blank=True)
    movie = models.ForeignKey(
        MovieVO,
        related_name="reviews",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    # user = models.ForeignKey(
    #     User,
    #     related_name="reviews",
    #     on_delete=models.PROTECT,
    #     null=True,
    #     blank=True,
    # )