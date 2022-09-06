from django.contrib import admin

# Register your models here.

from couchr_lists.models import MovieVO, List, LikedList, WatchedList, WishList

class MovieVOAdmin(admin.ModelAdmin):
    pass

class ListAdmin(admin.ModelAdmin):
    pass

class LikedListAdmin(admin.ModelAdmin):
    pass

class WatchedListAdmin(admin.ModelAdmin):
    pass

class WishListAdmin(admin.ModelAdmin):
    pass


admin.site.register(MovieVO, ListAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(LikedList, LikedListAdmin)
admin.site.register(WatchedList, WatchedListAdmin)
admin.site.register(WishList, WishListAdmin)