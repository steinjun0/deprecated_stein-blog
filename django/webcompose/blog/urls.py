"""dapada_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import urls

from django.contrib.auth.models import User
from rest_framework import routers, viewsets
from rest_framework import serializers as rest_serializers
from . import models
from . import views
from . import serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework import status
import json

# Serializers define the API representation.


class UserSerializer(rest_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'post', PostViewSet)
router.register(r'category', CategoryViewSet)

# router.register(r'companys', parsed_data_view.CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # re_path('^post/(?P<query>.+)/$',
    #         views.Posts.as_view()),
    #     re_path('^company/(?P<query>.+)/$',
    #             parsed_data_view.CompanysList.as_view()),
    #     re_path('^company_list/reporter/(?P<reporter_name>.+)/sector/(?P<sector_name>.+)/$',
    #             parsed_data_view.CompanyReporterSectorList.as_view()),
    #     re_path('^company_list/reporter/(?P<reporter_name>.+)/$',
    #             parsed_data_view.CompanyReporterList.as_view()),
    #     re_path('^company_list/sector/(?P<sector_name>.+)/$',
    #             parsed_data_view.CompanySectorList.as_view()),
    #     re_path('^sector/(?P<reporter_name>.+)/$',
    #             parsed_data_view.SectorReporterMoneyList.as_view())
]
