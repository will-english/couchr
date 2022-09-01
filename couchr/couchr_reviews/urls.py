from django.urls import path
from .views import api_reviews, api_review

urlpatterns = [
    # get all reviews from a user
    path("<str:username>/", api_reviews, name="api_reviews"),

    # get a specific list from a user
    path("<str:username>/<int:pk>/", api_review, name="api_review"),
]