from django.contrib import admin
from django.utils.html import mark_safe
from .models import Category, Course, Lesson, Tag

from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


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
    list_display = ['id', 'subject', 'created_date', 'active']
    search_fields = ['subject']
    list_filter = ['id', 'subject', 'created_date']
    form = CourseForm


class TagInlineAdmin(admin.StackedInline):
    model = Lesson.tags.through


class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date']
    form = LessonForm
    readonly_fields = ['avatar']
    inlines = [TagInlineAdmin, ]

    def avatar(self, lesson):
        return mark_safe("<img src='/static/{}' width='120' />".format(lesson.image.name))

    class Media:
        css = {
            'all': ('/static/css/style.css', )
        }


admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
