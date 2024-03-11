from django.urls import path
from .views import *

urlpatterns = [
    path('register/user/', UserRegistrationView.as_view()),
    path('login/', CustomAuthToken.as_view(), name='token'),
    path('logut/', LogoutView.as_view, name='Logout'),
    path('users/', UserListView.as_view(), name='user-list'),
]
 