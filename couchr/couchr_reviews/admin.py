from django.contrib import admin

# Register your models here.

from couchr_reviews.models import Review

class ReviewAdmin(admin.ModelAdmin):
    pass

admin.site.register(Review, ReviewAdmin)