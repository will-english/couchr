from django.urls import path
from .views import (
    api_movies, 
    api_movie, 
    api_lists, 
    api_list, 
    api_list_movies, 
    api_list_liked, 
    api_list_watched, 
    api_list_wish,
    get_public_lists
)

urlpatterns = [
    # movie list views ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    # get all movie VOs in DB
    path("movies/", api_movies, name="api_movies"),

    # get a specific movie VO in DB
    path("movies/<int:pk>/", api_movie, name="api_movie"),


    # list views not including liked/watched/wish ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    # get all lists from a user
    path("user/<str:username>/", api_lists, name="api_lists"),

    # get a specific list from a user
    path("user/<str:username>/<int:pk>/", api_list, name="api_list"),

    # get a specific list from a user to add/remove movies
    path("user/<str:username>/<int:pk>/movies/", api_list_movies, name="api_list_movies"),


    # liked/watched/wish list views ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    # get liked list from a user
    path("user/<str:username>/liked/", api_list_liked, name="api_lists_liked"),

    # get watched list from a user
    path("user/<str:username>/watched/", api_list_watched, name="api_lists_watched"),

    # get wish list from a user
    path("user/<str:username>/wish/", api_list_wish, name="api_lists_wish"),

    # get public lists
    path("public/", get_public_lists, name="get_public_lists"),
]