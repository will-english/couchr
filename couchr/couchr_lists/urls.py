from django.urls import path
from .views import api_lists, api_list, api_list_movies, api_movies, api_movie

urlpatterns = [
    path("<str:userName>/", api_lists, name="api_lists"),
    path("<int:pk>/", api_list, name="api_list"),
    path("<int:pk>/movies/", api_list_movies, name="api_list_movies"),
    path("movies/", api_movies, name="api_movies"),
    path("movies/<int:pk>/", api_movie, name="api_movie"),
]