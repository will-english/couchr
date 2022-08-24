from django.db import models

# Create your models here.

class MovieVO(models.Model):
    # title might not be necessary once we actually have api_url working
    title = models.CharField(max_length=100, unique=False, null=True, blank=True)
    api_url = models.URLField(unique=False, null=True, blank=True)

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