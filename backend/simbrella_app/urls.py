from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', views.UserRegistrationView.as_view(), name='register'),
    path('auth/login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile endpoints
    path('auth/profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('auth/profile/update/', views.UserProfileUpdateView.as_view(), name='profile_update'),
    path('auth/change-password/', views.PasswordChangeView.as_view(), name='change_password'),
    
    # Protected endpoints
    path('protected/', views.protected_view, name='protected'),
]