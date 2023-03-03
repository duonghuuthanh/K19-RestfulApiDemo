from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import Category, Course, Lesson
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer, LessonDetailSerializer
from .paginators import CoursePaginator


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    pagination_class = CoursePaginator

    def filter_queryset(self, queryset):
        q = queryset
        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(subject__icontains=kw)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            q = q.filter(category_id=cate_id)

        return q

    # def get_queryset(self):
    #     q = self.queryset
    #
    #     kw = self.request.query_params.get('kw')
    #     if kw:
    #         q = q.filter(subject__icontains=kw)
    #
    #     cate_id = self.request.query_params.get('category_id')
    #     if cate_id:
    #         q = q.filter(category_id=cate_id)
    #
    #     return q

    @action(methods=['get'], detail=True, url_path='lessons')
    def my_lessons(self, request, pk):
        c = self.get_object()

        lessons = c.lesson_set.filter(active=True)
        kw = request.query_params.get('kw')
        if kw:
            lessons = lessons.filter(subject__icontains=kw)

        return Response(LessonSerializer(lessons, many=True, context={'request': request}).data)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(active=True)
    serializer_class = LessonDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

