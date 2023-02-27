from django.contrib import admin
from .models import Category, Course, Lesson, Tag
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.utils.html import mark_safe


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Lesson
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'category']
    search_fields = ['subject', 'description']
    list_filter = ['id', 'subject', 'created_date']
    form = CourseForm


class TagInlindAdmin(admin.StackedInline):
    model = Lesson.tags.through


class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'active']
    form = LessonForm
    readonly_fields = ['avatar']
    inlines = [TagInlindAdmin, ]

    def avatar(self, lesson):
        return mark_safe("<img src='/static/{}' width='120' />".format(lesson.image.name))


# Register your models here.
admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
