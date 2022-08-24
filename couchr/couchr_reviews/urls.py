from django.urls import path
from .views import api_reviews, api_review

urlpatterns = [
    path("", api_reviews, name="api_reviews"),
    path("<int:pk>/", api_review, name="api_review"),
]