from rest_framework import viewsets, generics, permissions, parsers, status
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import Category, Course, Lesson, User, Tag, Comment, Liked, Rating
from .serializers import (
    CategorySerializer, CourseSerializer,
    LessonSerializer, LessonDetailSerializer,
    UserSerializer, CommentSerializer,
    AuthorizedLessonDetailSerializer
)
from .paginators import CoursePaginator
from .perms import CommentOwner


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    pagination_class = CoursePaginator

    def filter_queryset(self, queryset):
        q = queryset
        if self.action.__eq__('list'):
            kw = self.request.query_params.get('kw')
            if kw:
                q = q.filter(subject__icontains=kw)

            cate_id = self.request.query_params.get('category_id')
            if cate_id:
                q = q.filter(category_id=cate_id)

        return q

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

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthorizedLessonDetailSerializer

        return self.serializer_class

    def get_permissions(self):
        if self.action in ['assign_tags', 'comments', 'like', 'rating']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path='tags')
    def assign_tags(self, request, pk):
        lesson = self.get_object()

        tags = request.data.get('tags')
        for t in tags:
            tag, _ = Tag.objects.get_or_create(name=t)
            lesson.tags.add(tag)

        lesson.save()

        return Response(LessonDetailSerializer(lesson, context={'request': request}).data)

    @action(methods=['post'], detail=True, url_path='comments')
    def comments(self, request, pk):
        c = Comment(content=request.data['content'],
                    user=request.user,
                    lesson=self.get_object())
        c.save()

        return Response(CommentSerializer(c, context={'request': request}).data,
                        status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True, url_path='like')
    def like(self, request, pk):
        l, created = Liked.objects.get_or_create(user=request.user, lesson=self.get_object())
        if not created:
            l.liked = not l.liked
        l.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rating(self, request, pk):
        r, created = Rating.objects.get_or_create(user=request.user, lesson=self.get_object())
        r.rate = request.data['rate']
        r.save()

        return Response(status=status.HTTP_200_OK)


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
                setattr(u, k, v)
            u.save()

        return Response(UserSerializer(u, context={'request': request}).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializer
    permission_classes = [CommentOwner, ]
