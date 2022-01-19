import os
from django.conf import settings

from django.db.models import fields, Count
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
from rest_framework.decorators import action

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

    def list(self, request):
        queryset = models.Post.objects.all()
        serializer = serializers.PostSerializer(queryset, many=True, fields=('id', 'title', 'sub_title',
                                                                             'created_at', 'modified_at', 'categories'))

        return Response(serializer.data)

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

    @action(detail=False, methods=['get'])
    def get_main_page_list(self, request):
        posts = models.Post.objects.all()
        result = {
            'programming': [],
            'camera': [],
            'music': []
        }
        counter = [0, 0, 0]

        def get_data(category):
            return category['name']

        for post in posts:
            categories = post.categories.values()
            for category in categories:
                if counter[0] <= 2:
                    counter[0] += 1
                    if category['name'] == 'Programming':
                        result['programming'].append(
                            {'id': post.id, 'title': post.title, 'sub_title': post.sub_title, 'categories': list(map(get_data, categories))})
                        break
                elif category['name'] == 'Camera':
                    if counter[1] <= 2:
                        counter[1] += 1
                    result['camera'].append(
                        {'id': post.id, 'title': post.title, 'sub_title': post.sub_title, 'categories': list(map(get_data, categories))})
                    break
                elif category['name'] == 'Music':
                    if counter[2] <= 2:
                        counter[2] += 1
                    result['music'].append(
                        {'id': post.id, 'title': post.title, 'sub_title': post.sub_title, 'categories': list(map(get_data, categories))})
                    break
        # serializer = serializers.PostSerializer(
        #     posts, many=True, context={'request': request})
        return Response(result)

    @action(detail=False, methods=['get'])
    def get_category_filtered_list(self, request):
        if 'category' in dict(request.query_params):
            category_names = dict(request.query_params)['category']
            category_objects = models.Category.objects.filter(
                name__in=category_names)
            queryset = models.Post.objects.filter(
                categories__in=category_objects).annotate(num_categories=Count('categories')).filter(num_categories=len(category_names))
            # categories__in: get every posts matched any of category in category_objects
            # annoate: make a num_categories field with Count of categories
            # filter(again): filter posts have exact number of category_names
        else:
            queryset = models.Post.objects.all()

        serializer = serializers.PostSerializer(
            queryset,
            many=True,
            context={'request': request},
            fields=('id', 'title', 'sub_title',
                    'created_at', 'modified_at', 'categories'))
        return Response(serializer.data)


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


class FileViewSet(viewsets.ModelViewSet):
    queryset = models.File.objects.all()
    serializer_class = serializers.FileSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        os.remove(settings.MEDIA_ROOT+'/'+str(instance.upload))
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
