from django.urls import path
from .views import api_lists, api_list, api_movies, api_movie

urlpatterns = [
    path("lists/", api_lists, name="api_lists"),
    path("lists/<int:pk>/", api_list, name="api_list"),
    path("movies/", api_movies, name="api_movies"),
    path("movies/<int:pk>/", api_movie, name="api_movie"),
]