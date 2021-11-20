from os import read
from django.contrib.auth.models import User, Group
# from blog import views
from blog import models
from rest_framework import serializers


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Post
        fields = ['title', 'sub_title', 'html',
                  'created_at', 'modified_at', 'categories']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    parent = serializers.StringRelatedField()

    class Meta:
        model = models.Category
        fields = ['name', 'type', 'parent']

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email', 'groups']


# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']


# class CompanyGroupMappingSerializer(serializers.HyperlinkedModelSerializer):
#     # sector = serializers.HyperlinkedRelatedField(many=False, view_name='sector-detail', read_only=True)
#     class Meta:
#         model = CompanyGroupMapping
#         fields = ['name', 'company_id']

# class CompanySerializer(serializers.HyperlinkedModelSerializer):
#     # sector = serializers.HyperlinkedRelatedField(many=False, view_name='sector-detail', read_only=True)
#     company_group = CompanyGroupMappingSerializer(many = True, read_only=True)
#     class Meta:
#         model = Company
#         fields = ['name', 'code', 'sector','company_group']


# class SectorSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Sector
#         fields = ['name']

# class ReporterSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Reporter
#         fields = ['name']


# class OHLCVSerializer(serializers.HyperlinkedModelSerializer):
#     # company = serializers.HyperlinkedRelatedField(many=False, view_name='company-detail', read_only=True)
#     company_name = serializers.CharField(source='company.name')
#     class Meta:
#         model = OHLCV
#         fields = ['company_name','date','open', 'high','low','close','volume']


# class ShareAnnounceSerializer(serializers.HyperlinkedModelSerializer):
#     # publish_cmp = serializers.HyperlinkedRelatedField(many=False, view_name='company-detail', read_only=True)
#     # reporter = serializers.HyperlinkedRelatedField(many=False, view_name='reporter-detail', read_only=True)
#     publish_cmp_name = serializers.CharField(source='publish_cmp.name')
#     publish_cmp_code = serializers.IntegerField(source='publish_cmp.code')
#     reporter_name = serializers.CharField(source='reporter.name')
#     ohlcv = OHLCVSerializer(many = True, read_only=True)
#     company_group = CompanyGroupMappingSerializer(source='publish_cmp.company_group',many = True, read_only=True)
#     # group_name = serializers.CharField(source='publish_cmp.company_group.name')
#     # group_id = serializers.CharField(source='publish_cmp.company_group.id')
#     # group_name = serializers.CharField(company_group)

#     # close = serializers.IntegerField(source='ohlcv.close')
#     class Meta:
#         model = ShareAnnounce
#         fields = ('publish_cmp_name','publish_cmp_code', 'reporter_name','report_reason',
#                 'date', 'stock_sort', 'ratio', 'before_share',
#                 'difference', 'share_after','ohlcv','company_group',)
