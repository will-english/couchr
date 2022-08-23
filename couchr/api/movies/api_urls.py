from django.urls import path
from .api_views import (
    api_list_movies
)


urlpatterns = [
    path(
        "movies/",
        api_list_movies,
        name="api_movies",
    ),
]