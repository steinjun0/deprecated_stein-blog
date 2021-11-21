from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from . import models
from . import serializers

from django.contrib.auth.models import User

from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser, AllowAny

import json

# Create your views here.
# class Posts(APIView):
#     # serializer_class = serializers.CompanySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get(self, request, query):
#         try:
#             if query.isnumeric():
#                 return Response(CompanySerializer(models.Company.objects.filter(code=query)).data, status=status.HTTP_200_OK)
#             else:
#                 queryset = models.Company.objects.filter(name__contains=query)

#                 return Response(CompanySerializer(queryset, context={'request': request}, many=True).data, status=status.HTTP_200_OK)
#         except Exception as e:
#             raise ValidationError(detail=f'에러 발생: {e}')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer

    def create(self, request):

        post = models.Post(title=request.data['title'], sub_title=request.data['sub_title'],
                           html=request.data['html'])
        post.save()

        categories = []
        for pk in request.data['categories']:
            category = models.Category.objects.get(id=pk)
            post.categories.add(category)
            categories.append(category.name)
        return Response({'title': post.title, 'sub_title': post.sub_title, 'html': post.html, 'categories': json.dumps(categories)})


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        return [permission() for permission in [AllowAny]]

    def create(self, request):
        try:
            new_category = None
            if request.data['type'] == 'sub':
                parent = models.Category.objects.get(
                    id=request.data['parentId'])
                if len(models.Category.objects.filter(name=request.data['name'], type=request.data['type'], parent=parent)) == 0:
                    new_category = models.Category(
                        name=request.data['name'], type=request.data['type'], parent=parent)
            else:
                if len(models.Category.objects.filter(
                        name=request.data['name'], type=request.data['type'])):
                    new_category = models.Category(
                        name=request.data['name'], type=request.data['type'])
            if not (new_category is None):
                new_category.save()
                return Response({'id': new_category.id, 'name': new_category.name, 'type': new_category.type})
            else:
                return Response('이미 존재하는 카테고리입니다.', status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            raise ValidationError(detail=f'에러 발생: {e}')
