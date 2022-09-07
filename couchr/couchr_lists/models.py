from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MovieVO(models.Model):
    title = models.CharField(max_length=100, unique=False, null=True, blank=True)
    api_url = models.URLField(unique=True, null=True, blank=True)
    api_id = models.CharField(max_length=100, unique=False, null=True, blank=True)

class List(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.CharField(max_length=100, unique=False, null=True, blank=True)
    public = models.BooleanField(default=False)
    movies = models.ManyToManyField(
        MovieVO,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        related_name="lists",
        on_delete=models.CASCADE,
        null=True,
    )
    def __str__(self):
        return f'{self.name}'

class LikedList(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.CharField(max_length=100, unique=False, null=True, blank=True)
    movies = models.ManyToManyField(
        MovieVO,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        related_name="likedlist",
        on_delete=models.CASCADE,
        null=True,
    )

class WatchedList(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.CharField(max_length=100, unique=False, null=True, blank=True)
    movies = models.ManyToManyField(
        MovieVO,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        related_name="watchedlist",
        on_delete=models.CASCADE,
        null=True,
    )

class WishList(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.CharField(max_length=100, unique=False, null=True, blank=True)
    movies = models.ManyToManyField(
        MovieVO,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        related_name="wishlist",
        on_delete=models.CASCADE,
        null=True,
    )