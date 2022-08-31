from django.contrib import admin

# Register your models here.

from couchr_lists.models import List, MovieVO

class ListAdmin(admin.ModelAdmin):
    pass

class MovieVOAdmin(admin.ModelAdmin):
    pass

admin.site.register(List, ListAdmin)
admin.site.register(MovieVO, ListAdmin)