from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('categories', views.CategoryViewSet)
r.register('courses', views.CourseViewSet)

urlpatterns = [
    path('', include(r.urls))
]