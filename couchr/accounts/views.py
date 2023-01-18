from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
import json
from couchr_lists.models import LikedList, WatchedList, WishList

@require_http_methods(["GET"])
def api_user_token(request):
    if "jwt_access_token" in request.COOKIES:
        cookies = request.COOKIES
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token, "cookies":cookies})
    response = JsonResponse({"cookies":cookies})
    return response

@require_http_methods(['POST', 'DELETE'])
def api_user_signup(request):
    content = json.loads(request.body)
    if request.method == 'POST':
        try:
        #     # create user
            user = User.objects.create_user(
                username = content['username'],
                password = content['password'],
                email = content['email'],
                first_name = content['first_name'],
                last_name = content['last_name'],
            )

            # create user's liked list
            liked_list = LikedList.objects.create(
                name = "Liked List",
                description = "All your liked movies",
            )
            liked_list.user = user
            liked_list.save()

            # create user's watched list
            watched_list = WatchedList.objects.create(
                name = "Watched List",
                description = "All your watched movies",
            )
            watched_list.user = user
            watched_list.save()

            # create user's wish list
            wish_list = WishList.objects.create(
                name = "Wish List",
                description = "All your want-to-watch movies",
            )
            wish_list.user = user
            wish_list.save()
            

        except:
            return JsonResponse({'error':'500 error'})
        print('&&&&&&&&&&&&&&&&&&&&&&&&')
        return JsonResponse({'signup':True})
    elif request.method == 'DELETE':
        print('$#$#$#$#$#$#$#$#$#$#$', User.objects.get(username = content['username']))
        user = User.objects.get(username = content['username'])
        user.delete()
        print('@@@@@@@@@@@@@@@@@@@@@', user)
        # try:
        #     print('@#@#@#@#@#@#@#@#@#@#@#', User.objects.get(username = content['username']))
        # except User.DoesNotExist:
        #     print('@#$@#$@#$@#$ user was deleted')
        return JsonResponse({'account deleted' : True})