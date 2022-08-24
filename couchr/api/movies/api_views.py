from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Movie
import json


class MovieListEncoder(ModelEncoder):
    model = Movie
    properties = ["name"]


def api_list_movies(request):
        movies = Movie.objects.all()
        return JsonResponse(
            {"Movies": movies},
            encoder=MovieListEncoder,
        )