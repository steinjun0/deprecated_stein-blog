from os import read
from django.contrib.auth.models import User, Group
# from blog import views
from blog import models
from rest_framework import serializers

# Custom Serializer


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

# Serializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    parent = serializers.StringRelatedField()

    class Meta:
        model = models.Category
        fields = ['id', 'name', 'type', 'parent']
        # fields = '__all__'


class PostSerializer(DynamicFieldsModelSerializer):
    category = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = models.Post
        fields = '__all__'
        depth = 1
        # fields = ['title', 'sub_title', 'html',
        #           'created_at', 'modified_at', 'categories']


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
