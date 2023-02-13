from django.contrib import admin
from .models import Category, Course


class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'category']
    search_fields = ['subject', 'description']
    list_filter = ['id', 'subject', 'created_date']


# Register your models here.
admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
