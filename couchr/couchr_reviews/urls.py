from django.urls import path
from .views import (
    api_reviews,
    api_review,
    api_reviews_all,
)

urlpatterns = [
    # get all reviews from a user
    path("user/<str:username>/", api_reviews, name="api_reviews"),

    # get a specific list from a user
    path("user/<str:username>/<int:pk>/", api_review, name="api_review"),

    # get all reviews
    path("all/<int:api_id>/", api_reviews_all, name="api_reviews_all"),
]