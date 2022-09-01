from couchr_reviews.common.json import ModelEncoder

from .models import Review

class ReviewEncoder(ModelEncoder):
    model = Review
    properties = [
        "id",
        "name",
        "description",
    ]

    def get_extra_data(self, o):
        try:
            return {
                "movie_id": o.movie.id,
                "movie_title": o.movie.title,
            }
        except:
            return {
                "Cannot get extra data in encoders file"
            }