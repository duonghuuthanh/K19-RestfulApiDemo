from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('categories', views.CategoryViewSet)
r.register('courses', views.CourseViewSet)
r.register('lessons', views.LessonViewSet)

urlpatterns = [
    path('', include(r.urls))
]
