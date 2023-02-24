from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    pass


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Course(BaseModel):
    subject = models.CharField(max_length=255)
    description = RichTextField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    image = models.ImageField(upload_to="courses/%Y/%m", null=True)

    def __str__(self):
        return self.subject


class Lesson(BaseModel):
    subject = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(upload_to="courses/%Y/%m", null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', related_name="lessons")

    def __str__(self):
        return self.subject


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
