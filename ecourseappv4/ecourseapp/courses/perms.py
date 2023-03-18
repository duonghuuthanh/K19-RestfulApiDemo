from rest_framework import permissions


class CommentOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return request.user and request.user == comment.user
