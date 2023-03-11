from rest_framework import viewsets, generics, parsers, permissions
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import Category, Course, Lesson, User, Tag
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer, LessonDetailSerializer, UserSerializer
from .paginators import CoursePaginator


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    pagination_class = CoursePaginator

    def filter_queryset(self, queryset):
        q = self.request.query_params.get("q")
        if q:
            queryset = queryset.filter(subject__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            queryset = queryset.filter(category_id=cate_id)

        return queryset

    @action(methods=['get'], detail=True, url_path='lessons')
    def lessons(self, request, pk):
        c = self.get_object() # Course.query.get(pk=pk)
        lessons = c.lesson_set.filter(active=True)

        return Response(LessonSerializer(lessons, many=True, context={'request': request}).data)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(active=True)
    serializer_class = LessonDetailSerializer

    def get_permissions(self):
        if self.action in ['assign_tag']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path='tags')
    def assign_tag(self, request, pk):
        lesson = self.get_object()
        tags = request.data.get('tags')
        for t in tags:
            tag, _ = Tag.objects.get_or_create(name=t)
            lesson.tags.add(tag)
        lesson.save()

        return Response(LessonDetailSerializer(lesson, context={'request': request}).data)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get', 'put'], detail=False, url_path='current-user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            for k, v in request.data.items():
                if k.__eq__('password'):
                    u.set_password(k)
                else:
                    setattr(u, k, v)
            u.save()

        return Response(UserSerializer(u, context={'request': request}).data)
