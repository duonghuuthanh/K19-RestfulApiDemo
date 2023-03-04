from rest_framework import serializers
from .models import Category, Course, Lesson, Tag


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

