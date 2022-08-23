import json, requests
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from .models import List, MovieVO

# Create your views here.

@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_lists(request):
    if request.method == "GET":
        lists = List.objects.all()
        response = []
        for list in lists:
            dict = {}
            dict["id"] = list.id
            dict["name"] = list.name
            dict["description"] = list.description
            response.append(dict)
        return JsonResponse(
            {"lists": response}
        )
    else:
        try:
            content = json.loads(request.body)
            list2 = List.objects.create(**content)
            list2.save()
            return JsonResponse(
                content,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse(
                {"message": "Could not create the list"}
            )
            print(e)
            response.status_code = 400
            return response

@csrf_exempt
@require_http_methods(["DELETE", "GET", "PUT"])
def api_list(request, pk):
    if request.method == "GET":
        try:
            list = List.objects.get(id=pk)
            response = []
            dict = {}
            dict["id"] = list.id
            dict["name"] = list.name
            dict["description"] = list.description
            dict["movies"] = []
            for movie in list.movies.all():
                dict["movies"].append(movie.id)
            response.append(dict)
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
            list = List.objects.get(id=pk)
            for key in content:
                if key == "movie":
                    value = content[key]
                    try:
                        movie = MovieVO.objects.get(id=content[key])
                        if content['add']:
                            list.movies.add(movie)
                        elif not content['add']:
                            list.movies.remove(movie)
                        else:
                            # for now, just in case 'add' attribute is null
                            # but on frontend, only 2 react buttons add/delete will exist, so this shouldn't be an issue
                            pass
                    except:
                        # post_data = {'title': value}
                        # response = requests.post('http://localhost:8090/api/movies/', data=post_data)
                        # content = response.content

                        response = JsonResponse(
                            {"message": "Movie does not list"}
                        )
                        response.status_code = 400
                        return response
                else:
                    # setattr(obj to be changed, key to be accessed, value of the change)
                    setattr(list, key, content[key])
            list.save()
            # just to show the JSON response, but doesn't affect the actual list object above
            response = []
            dict = {}
            dict["id"] = list.id
            dict["name"] = list.name
            dict["description"] = list.description
            dict["movies"] = []
            for movie in list.movies.all():
                dict["movies"].append(movie.id)
            response.append(dict)
            return JsonResponse(
                {"list": response}
            )
        except List.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_movies(request):
    if request.method == "GET":
        movies = MovieVO.objects.all()
        response = []
        for movie in movies:
            dict = {}
            dict["id"] = movie.id
            dict["title"] = movie.title
            response.append(dict)
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
            dict = {}
            dict["id"] = movie.id
            dict["title"] = movie.title
            dict["api_url"] = movie.api_url
            response.append(dict)
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