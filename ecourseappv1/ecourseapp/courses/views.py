from rest_framework import viewsets, generics
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer
from .paginators import CoursePaginator
from rest_framework.decorators import action
from rest_framework.views import Response


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    pagination_class = CoursePaginator

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(subject__icontains=kw)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            q = q.filter(category_id=cate_id)

        return q

    @action(methods=['get'], detail=True, url_path='lessons')
    def lessons(self, request, pk):
        c = self.get_object()
        lessons = c.lesson_set.filter(active=True)

        return Response(LessonSerializer(lessons, many=True).data)

