from couchr_reviews.common.json import ModelEncoder

from .models import Review

class ReviewEncoder(ModelEncoder):
    model = Review
    properties = [
        "id",
        "title",
        "description",
    ]

    def get_extra_data(self, o):
        return {
            "movie_id": o.movie.id,
            "movie_api_id": o.movie.api_id,
            "movie_title": o.movie.title,
            "user": o.user.username,
        }