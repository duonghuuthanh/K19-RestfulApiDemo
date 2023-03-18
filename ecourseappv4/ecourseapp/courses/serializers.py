from rest_framework import serializers
from .models import Category, Course, Lesson, Tag, User, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % obj.image.name) if request else ''


class CourseSerializer(ImageSerializer):
    class Meta:
        model = Course
        fields = ['id', 'subject', 'created_date', 'category_id', 'image']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LessonSerializer(ImageSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'image']


class LessonDetailSerializer(LessonSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tags']


class AuthorizedLessonDetailSerializer(LessonDetailSerializer):
    liked = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_liked(self, lesson):
        request = self.context.get('request')
        if request:
            return lesson.like_set.filter(user=request.user, liked=True).exists()

    def get_rate(self, lesson):
        request = self.context.get('request')
        if request:
            r = lesson.rating_set.filter(user=request.user).first()
            return r.rate if r else 0

    class Meta:
        model = LessonDetailSerializer.Meta.model
        fields = LessonDetailSerializer.Meta.fields + ['liked', 'rate']


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='avatar')

    def get_image(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % obj.avatar.name) if request else ''

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'avatar', 'image']
        extra_kwargs = {
            'avatar': {'write_only': 'True'},
            'password': {'write_only': 'True'}
        }


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'user']

