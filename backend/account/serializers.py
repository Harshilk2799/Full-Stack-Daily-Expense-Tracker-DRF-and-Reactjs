from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this because we need password2 field in our Registration Request
    password2 = serializers.CharField(style={"input_type":"password"}, write_only=True)
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "password", "password2"]
        extra_kwargs = {"password": {"write_only":True}}
        
    # Validating password and confirm password while registration
    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't Match!")
        return attrs
    
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    class Meta:
        model = CustomUser
        fields = ["email", "password"]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "email"]


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,style={"input_type":"password"}, write_only=True)
    password2 = serializers.CharField(max_length=255,style={"input_type":"password"}, write_only=True)
    class Meta:
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        user = self.context.get("user")
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't Match!")
        user.set_password(password)
        user.save()
        return attrs