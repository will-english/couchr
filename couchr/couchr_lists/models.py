from django.db import models

# Create your models here.

class MovieVO(models.Model):
    title = models.CharField(max_length=100, unique=False, null=True, blank=True)
    api_url = models.URLField(unique=True, null=True, blank=True)
    api_id = models.CharField(max_length=100, unique=False, null=True, blank=True)

# We will use the user model once auth all figured out

# class User(models.Model):
#     user_id = models.CharField(max_length=100, unique=False, null=True, blank=True)

class List(models.Model):
    name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    description = models.CharField(max_length=100, unique=False, null=True, blank=True)
    movies = models.ManyToManyField(
        MovieVO,
    )
    # user = models.ForeignKey(
    #     User,
    #     related_name="lists",
    #     on_delete=models.PROTECT,
    #     null=True,
    #     blank=True,
    # )