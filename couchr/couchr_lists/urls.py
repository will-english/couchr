from django.urls import path
from .views import api_lists, api_list, api_list_movies, api_movies, api_movie

urlpatterns = [
    path("lists/<int:user_id>/", api_lists, name="api_lists"),# add a new list
    path("<int:pk>/", api_list, name="api_list"),
    path("<int:pk>/movies/", api_list_movies, name="api_list_movies"),#put mothod to add movie to list
    path("movies/", api_movies, name="api_movies"),
    path("movies/<int:pk>/", api_movie, name="api_movie"),
]


# {
#     "add": True
#     "title": movie.title
#     "id": movie.id
# }
