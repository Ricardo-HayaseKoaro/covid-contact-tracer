from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, ChangePasswordAPI, UpdateAccountAPI, DeleteUserAPI
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/delete', DeleteUserAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/auth/change_password', ChangePasswordAPI.as_view(), name='auth_change_password'),
  path('api/auth/update_account', UpdateAccountAPI.as_view(), name='auth_update_account'),
]