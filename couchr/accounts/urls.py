from django.urls import path
from .views import (
    api_user_token, 
    api_user_signup,
    )

urlpatterns = [
    path("mine/", api_user_token, name="api_user_token"),
    path("signup/", api_user_signup, name="api_user_signup"),

]