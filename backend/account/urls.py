from django.urls import path
from account import views 
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", views.RegistrationView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("profile/", views.UserProfileView.as_view(), name="profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("changepassword/", views.UserChangePasswordView.as_view(), name="changepassword"),
]

