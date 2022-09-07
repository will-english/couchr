import json
import djwto.authentication as auth
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods

from .models import Review
from .encoders import ReviewEncoder
from couchr_lists.models import MovieVO

# Create your views here.


# get all reviews from a user
@auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_reviews(request, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        reviews = Review.objects.filter(user=user)

        return JsonResponse(
            {"reviews": reviews},
            encoder=ReviewEncoder,
        )

    # POST
    else:
        try:
            content = json.loads(request.body)

            # get MovieVO or create one (using attribute api_id) if it doesn't already exist in the DB
            movie, created = MovieVO.objects.get_or_create(api_id=content["api_id"])
            movie.title = content["movie_title"]
            movie.save()

            review = Review.objects.create(
                title = content["title"],
                description = content["description"]
            )
            review.user = user
            review.movie = movie
            review.save()

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


# get a specific reviews from a user
@auth.jwt_login_required
@require_http_methods(["DELETE", "GET", "PUT"])
def api_review(request, pk, username):
    user = User.objects.get(username=username)

    if request.method == "GET":
        try:
            review = Review.objects.get(id=pk, user=user)

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
            review = Review.objects.get(id=pk, user=user)
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
    
    # PUT
    else:
        try:
            content = json.loads(request.body)
            review = Review.objects.get(id=pk, user=user)

            props = ["title", "description"]
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