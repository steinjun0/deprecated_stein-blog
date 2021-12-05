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


class FileSerializer(DynamicFieldsModelSerializer):
    # name, upload, created_at
    class Meta:
        model = models.File
        fields = '__all__'
