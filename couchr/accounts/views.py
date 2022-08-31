from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
import json

@require_http_methods(["GET"])
def api_user_token(request):
    if "jwt_access_token" in request.COOKIES:
        cookies = request.COOKIES
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token, "cookies":cookies})
    response = JsonResponse({"cookies":cookies})
    return response

@require_http_methods(['POST'])
def api_user_signup(request):
    content = json.loads(request.body)
    try:
        User.objects.create_user(
            username = content['username'],
            password = content['password'],
            email = content['email'],
            first_name = content['first_name'],
            last_name = content['last_name'],
            )
    except:
        return JsonResponse({'error':'500 error'})

    return JsonResponse({'signup':'true'})