import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from .models import List, MovieVO

# Create your views here.


# I was unable to figure out how to pass data with m2m attributes through the encoders
# so all the list views use knockoff encoders

# knockoff list encoder
def list_encoder(list):
    dict = {}
    dict["id"] = list.id
    dict["name"] = list.name
    dict["description"] = list.description
    dict["movies"] = []
    for movie in list.movies.all():
        dict["movies"].append(movie.id)
    return dict

@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_lists(request):
    if request.method == "GET":
        lists = List.objects.all()
        response = []
        for list in lists:
            list_dict = list_encoder(list)
            response.append(list_dict)

        return JsonResponse(
            {"lists": response}
        )

    else:
        try:
            content = json.loads(request.body)
            list = List.objects.create(**content)
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


@csrf_exempt
@require_http_methods(["DELETE", "GET", "PUT"])
def api_list(request, pk):
    if request.method == "GET":
        try:
            list = List.objects.get(id=pk)

            response = []
            list_dict = list_encoder(list)
            response.append(list_dict)

            return JsonResponse(
                {"list": response}
            )

        except List.DoesNotExist:
            response = JsonResponse({"message" : "Does not exist"})
            response.status_code = 404

            return response

    elif request.method == "DELETE":
        try:
            list = List.objects.get(id=pk)
            list.delete()

            return JsonResponse(
                {"message": "Successfully deleted"}
            )

        except List.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

    else:
        try:
            content = json.loads(request.body)
            List.objects.update(
                name = content["name"],
                description = content["description"]
            )

            list = List.objects.get(id=pk)
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

# a separate PUT method to add/remove movies from a list
@csrf_exempt
@require_http_methods(["PUT"])
def api_list_movies(request, pk):
    try:
        list = List.objects.get(id=pk)
        content = json.loads(request.body)

        # use code below when calling this PUT method from insomnia
        movie, created = MovieVO.objects.get_or_create(id=content["movie_api_url"])

        # use code below when we calling this PUT method from the frontend
        # movie, created = MovieVO.objects.get_or_create(movie_api_url=content["movie_api_url"])

        # JSON body needs to have an "add" key with a value of "True" or "False"
        # true adds the movie, false removes the movie
        if content['add'] == True:
            list.movies.add(movie)
        elif content['add'] == False:
            list.movies.remove(movie)

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


# knockoff movie encoder
def movie_encoder(movie):
    dict = {}
    dict["id"] = movie.id
    dict["title"] = movie.title
    dict["api_url"] = movie.api_url
    dict["api_id"] = movie.api_id
    return dict

@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_movies(request):
    if request.method == "GET":
        movies = MovieVO.objects.all()
        response = []

        for movie in movies:
            movie_dict = movie_encoder(movie)
            response.append(movie_dict)

        return JsonResponse(
            {"movies: ": response}
        )
        
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

@csrf_exempt
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
            response = JsonResponse({"message" : "Does not exist"})
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