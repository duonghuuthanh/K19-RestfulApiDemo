from django.contrib import admin
from .models import Category, Course
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    list_display = ['pk', 'subject', 'created_date', 'category']
    search_fields = ['subject']
    list_filter = ['id', 'subject', 'created_date']
    form = CourseForm


admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
