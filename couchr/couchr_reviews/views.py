import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Review
from .encoders import ReviewEncoder
from couchr_lists.models import MovieVO

# Create your views here.

@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_reviews(request):
    if request.method == "GET":
        reviews = Review.objects.all()

        return JsonResponse(
            {"reviews": reviews},
            encoder=ReviewEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            movie_id = content["movie_id"]
            movie = MovieVO.objects.get(id=movie_id)
            content["movie"] = movie

            review = Review.objects.create(**content)

            return JsonResponse(
                review,
                encoder=ReviewEncoder,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "Could not create the review"}
            )
            response.status_code = 400

            return response


@csrf_exempt
@require_http_methods(["DELETE", "GET", "PUT"])
def api_review(request, pk):
    if request.method == "GET":
        try:
            review = Review.objects.get(id=pk)

            return JsonResponse(
                review,
                encoder=ReviewEncoder,
                safe=False
            )
            
        except Review.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response

    elif request.method == "DELETE":
        try:
            review = Review.objects.get(id=pk)
            review.delete()

            return JsonResponse(
                review,
                encoder=ReviewEncoder,
                safe=False,
            )

        except Review.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response
            
    else:
        try:
            content = json.loads(request.body)
            review = Review.objects.get(id=pk)

            props = ["name", "description"]
            for prop in props:
                if prop in content:
                    setattr(review, prop, content[prop])

            review.save()

            return JsonResponse(
                review,
                encoder=ReviewEncoder,
                safe=False,
            )

        except Review.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404

            return response