import json
import djwto.authentication as auth
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods

from .models import MovieVO, List, LikedList, WatchedList, WishList

# Create your views here.


# list views not including liked/watched/wish ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# list encoder
def list_encoder(list):
    dict = {}
    dict["id"] = list.id
    dict["name"] = list.name
    dict["description"] = list.description
    dict["public"] = list.public
    dict["user"] = list.user.username
    dict["movies"] = []
    for movie in list.movies.all():
        dict["movies"].append(movie.id)
    return dict

# get all lists from a user
@auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_lists(request, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        lists = List.objects.filter(user=user)
        response = []
        for list in lists:
            list_dict = list_encoder(list)
            response.append(list_dict)

        return JsonResponse(
            {"lists": response}
        )

    # POST
    else:
        try:
            content = json.loads(request.body)
            list = List.objects.create(**content)
            list.user = user
            list.save()

            return JsonResponse(
                content,
                safe=False,
            )

        except Exception as e:
            response = JsonResponse(
                {"message": "Could not create the list"}
            )
            response.status_code = 400

            return response

# get a specific list from a user
@auth.jwt_login_required
@require_http_methods(["DELETE", "GET", "PUT"])
def api_list(request, pk, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        try:
            list = List.objects.get(id=pk, user=user)

            response = []
            list_dict = list_encoder(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except List.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

    elif request.method == "DELETE":
        try:
            list = List.objects.get(id=pk, user=user)
            list.delete()

            return JsonResponse(
                {"message": "Successfully deleted"}
            )

        except List.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

    # PUT method to update a list's name/description
    else:
        try:
            content = json.loads(request.body)
            list = List.objects.get(id=pk, user=user)

            props = ["name", "description", "public"]
            for prop in props:
                if prop in content:
                    setattr(list, prop, content[prop])

            list.save()

            response = []
            list_dict = list_encoder(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except List.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

# get a specific list from a user to add/remove movies
@auth.jwt_login_required
@require_http_methods(["PUT"])
def api_list_movies(request, pk, username):
    user = User.objects.get(username=username)

    try:
        list = List.objects.get(id=pk, user=user)
        content = json.loads(request.body)

        # JSON body needs to have an "add" key with a value of "true" or "false"
        # true adds the movie
        if content['add'] == True:

            # get MovieVO or create one (using attribute api_id) if it doesn't already exist in the DB
            movie, created = MovieVO.objects.get_or_create(
                api_id=content["api_id"])
            movie.title = content["title"]
            movie.poster = content['poster']
            movie.save()

            # if MovieVO isn't already in the list, then add it
            if movie not in list.movies.all():
                list.movies.add(movie)

            # if MovieVO is already in the list, then send an error response
            else:
                response = JsonResponse({"message": "Movie already in list"})
                response.status_code = 409

                return response

        # false removes the movie
        elif content['add'] == False:
            try:
                movie = MovieVO.objects.get(api_id=content["api_id"])
                list.movies.remove(movie)

            except MovieVO.DoesNotExist:
                response = JsonResponse({"message": "Movie does not exist"})
                response.status_code = 404

                return response

        response = []
        list_dict = list_encoder(list)
        response.append(list_dict)

        return JsonResponse(
            {"list": response}
        )

    except List.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 404

        return response

# get all public lists
@require_http_methods(["GET"])
def get_public_lists(request):
    lists = List.objects.filter(public=True)

    response = []
    for list in lists:
        list_dict = list_encoder(list)
        response.append(list_dict)

    return JsonResponse(
        {"lists": response}
    )


# liked/watched/wish list views ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# list encoder for liked/watched/wish
def list_encoder_for_default_lists(list):
    dict = {}
    dict["id"] = list.id
    dict["name"] = list.name
    dict["description"] = list.description
    dict["user"] = list.user.username
    dict["movies"] = []
    for movie in list.movies.all():
        movie_dict = {}
        movie_dict["id"] = movie.id
        movie_dict['poster'] = movie.poster
        dict['movies'].append(movie_dict)
    return dict

# get liked list from a user


@auth.jwt_login_required
@require_http_methods(["GET", "PUT"])
def api_list_liked(request, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        list = LikedList.objects.get(user=user)
        list_dict = list_encoder_for_default_lists(list)

        return JsonResponse(
            {"list": list_dict}
        )

    # PUT
    else:
        try:
            list = LikedList.objects.get(user=user)
            content = json.loads(request.body)

            # JSON body needs to have an "add" key with a value of "true" or "false"
            # true adds the movie
            if content['add'] == True:

                # get MovieVO or create one (using attribute api_id) if it doesn't already exist in the DB
                movie, created = MovieVO.objects.get_or_create(
                    api_id=content["api_id"])
                movie.title = content["title"]
                movie.poster = content['poster']
                movie.save()

                # if MovieVO isn't already in the list, then add it
                if movie not in list.movies.all():
                    list.movies.add(movie)

                # if MovieVO is already in the list, then send an error response
                else:
                    response = JsonResponse(
                        {"message": "Movie already in list"})
                    response.status_code = 409

                    return response

            # false removes the movie
            elif content['add'] == False:
                try:
                    movie = MovieVO.objects.get(api_id=content["api_id"])
                    list.movies.remove(movie)

                except MovieVO.DoesNotExist:
                    response = JsonResponse(
                        {"message": "Movie does not exist"})
                    response.status_code = 404

                    return response

            response = []
            list_dict = list_encoder_for_default_lists(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except LikedList.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

# get watched list from a user


@auth.jwt_login_required
@require_http_methods(["GET", "PUT"])
def api_list_watched(request, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        list = WatchedList.objects.get(user=user)
        list_dict = list_encoder_for_default_lists(list)

        return JsonResponse(
            {"list": list_dict}
        )

    # PUT
    else:
        try:
            list = WatchedList.objects.get(user=user)
            content = json.loads(request.body)

            # JSON body needs to have an "add" key with a value of "true" or "false"
            # true adds the movie
            if content['add'] == True:

                # get MovieVO or create one (using attribute api_id) if it doesn't already exist in the DB
                movie, created = MovieVO.objects.get_or_create(
                    api_id=content["api_id"])
                movie.title = content["title"]
                movie.poster = content['poster']
                movie.save()

                # if MovieVO isn't already in the list, then add it
                if movie not in list.movies.all():
                    list.movies.add(movie)

                # if MovieVO is already in the list, then send an error response
                else:
                    response = JsonResponse(
                        {"message": "Movie already in list"})
                    response.status_code = 409

                    return response

            # false removes the movie
            elif content['add'] == False:
                try:
                    movie = MovieVO.objects.get(api_id=content["api_id"])
                    list.movies.remove(movie)

                except MovieVO.DoesNotExist:
                    response = JsonResponse(
                        {"message": "Movie does not exist"})
                    response.status_code = 404

                    return response

            response = []
            list_dict = list_encoder_for_default_lists(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except WatchedList.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

# get wish list from a user
@auth.jwt_login_required
@require_http_methods(["GET", "PUT"])
def api_list_wish(request, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        list = WishList.objects.get(user=user)
        list_dict = list_encoder_for_default_lists(list)

        return JsonResponse(
            {"list": list_dict}
        )

    # PUT
    else:
        try:
            list = WishList.objects.get(user=user)
            content = json.loads(request.body)

            # JSON body needs to have an "add" key with a value of "true" or "false"
            # true adds the movie
            if content['add'] == True:

                # get MovieVO or create one (using attribute api_id) if it doesn't already exist in the DB
                movie, created = MovieVO.objects.get_or_create(
                    api_id=content["api_id"])
                movie.title = content["title"]
                movie.poster = content['poster']
                movie.save()

                # if MovieVO isn't already in the list, then add it
                if movie not in list.movies.all():
                    list.movies.add(movie)

                # if MovieVO is already in the list, then send an error response
                else:
                    response = JsonResponse(
                        {"message": "Movie already in list"})
                    response.status_code = 409

                    return response

            # false removes the movie
            elif content['add'] == False:
                try:
                    movie = MovieVO.objects.get(api_id=content["api_id"])
                    list.movies.remove(movie)

                except MovieVO.DoesNotExist:
                    response = JsonResponse(
                        {"message": "Movie does not exist"})
                    response.status_code = 404

                    return response

            response = []
            list_dict = list_encoder_for_default_lists(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except WishList.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response


# movie list views ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# movie encoder
def movie_encoder(movie):
    dict = {}
    dict["id"] = movie.id
    dict["title"] = movie.title
    dict["api_url"] = movie.api_url
    dict["api_id"] = movie.api_id
    dict['poster'] = movie.poster
    return dict

# get all movie VOs in DB
@require_http_methods(["GET", "POST"])
def api_movies(request):
    print("request: ", request)
    if request.method == "GET":
        movies = MovieVO.objects.all()
        response = []

        for movie in movies:
            movie_dict = movie_encoder(movie)
            response.append(movie_dict)

        return JsonResponse(
            {"movies: ": response}
        )

    # POST
    else:
        try:
            content = json.loads(request.body)
            movie = MovieVO.objects.create(**content)

            return JsonResponse(
                content,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "Could not create the list"}
            )
            response.status_code = 400

            return response

# get a specific movie VO in DB
@require_http_methods(["DELETE", "GET"])
def api_movie(request, pk):
    if request.method == "GET":
        try:
            movie = MovieVO.objects.get(id=pk)
            response = []
            movie_dict = movie_encoder(movie)
            response.append(movie_dict)

            return JsonResponse(
                {"movies: ": response}
            )

        except MovieVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

    elif request.method == "DELETE":
        try:
            movie = MovieVO.objects.get(id=pk)
            movie.delete()

            return JsonResponse(
                {"message": "Successfully deleted"}
            )

        except MovieVO.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


def get_public_lists(request):
    lists = List.objects.filter(public=True)

    response = []
    for list in lists:
        list_dict = list_encoder(list)
        response.append(list_dict)

    return JsonResponse(
        {"lists": response}
    )

# list encoder for liked/watched/wish
def list_encoder_for_movieVOs(list):
    dict = {}
    dict["id"] = list.id
    dict["name"] = list.name
    dict["description"] = list.description
    dict["movies"] = []
    for movie in list.movies.all():
        movie_dict = {}
        movie_dict["vo_id"] = movie.id
        movie_dict["title"] = movie.title
        movie_dict['poster_path'] = movie.poster
        movie_dict["id"] = movie.api_id
        dict['movies'].append(movie_dict)
    return dict

@auth.jwt_login_required
@require_http_methods(["GET"])
def api_list_movieVO(request, pk, username, name):
    user = User.objects.get(username=username)
    print(user.username)
    if name == 'liked':
        list = LikedList.objects.get(user=user)
        list_dict = list_encoder_for_movieVOs(list)
        print(list_dict)
        movies = list_dict['movies']
        return JsonResponse(
            {"movies": movies}
        )
    elif name == 'watched':
        list = WatchedList.objects.get(user=user)
        list_dict = list_encoder_for_movieVOs(list)
        movies = list_dict['movies']
        return JsonResponse(
            {"movies": movies}
        )
    elif name == 'want-to-watch':
        list = WishList.objects.get(user=user)
        list_dict = list_encoder_for_movieVOs(list)
        movies = list_dict['movies']
        return JsonResponse(
            {"movies": movies}
        )
    else:
        list = List.objects.get(user=user, pk=pk)
        list_dict = list_encoder_for_movieVOs(list)
        movies = list_dict['movies']
        return JsonResponse(
            {"movies": movies}
        )
