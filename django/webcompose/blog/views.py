from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from . import models
from . import serializers

from rest_framework import status
from rest_framework.exceptions import ValidationError

# Create your views here.
class Posts(APIView):
    # serializer_class = serializers.CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, query):
        try:
            if query.isnumeric():
                return Response(CompanySerializer(models.Company.objects.filter(code=query)).data, status=status.HTTP_200_OK)
            else:
                queryset = models.Company.objects.filter(name__contains=query)

                return Response(CompanySerializer(queryset, context={'request': request}, many=True).data, status=status.HTTP_200_OK)
        except Exception as e:
            raise ValidationError(detail=f'에러 발생: {e}')
