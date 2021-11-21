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

# Serializers define the API representation.


# ViewSets define the view behavior.


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'post', views.PostViewSet)
router.register(r'category', views.CategoryViewSet)

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
