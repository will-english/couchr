from django.urls import path
from .views import api_lists, api_list, api_list_movies, api_movies, api_movie

urlpatterns = [
    # get all movie VOs in DB
    path("movies/", api_movies, name="api_movies"),

    # get a specific movie VO in DB
    path("movies/<int:pk>/", api_movie, name="api_movie"),

    # get all movie lists from a user
    path("user/<str:username>/", api_lists, name="api_lists"),

    # get a specific list from a user
    path("user/<str:username>/<int:pk>/", api_list, name="api_list"),

    # get a specific list from a user to add/remove movies
    path("user/<str:username>/<int:pk>/movies/", api_list_movies, name="api_list_movies"),
]