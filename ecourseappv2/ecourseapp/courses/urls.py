from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('categories', views.CategoryViewSet, basename='category')
r.register('courses', views.CourseViewSet, basename='course')
r.register('lessons', views.LessonViewSet, basename='lesson')
r.register('users', views.UserViewSet, basename='user')


urlpatterns = [
    path('', include(r.urls)),
]
