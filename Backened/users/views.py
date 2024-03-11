import json
from rest_framework import generics, permissions
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import *
from .permissions import isFarmer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]  
    serializer_class =UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_data = UserRegisterSerializer(user, context=self.get_serializer_context()).data
        token = Token.objects.get(user=user).key
        return Response({
            'user': user_data,
            'token': token,
            'message': 'Account created successfully'
        })

class UserSerializer(ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'is_admin', 'is_staff']  


class CustomAuthToken(ObtainAuthToken):
    """
    Custom authentication view that builds upon the default ObtainAuthToken view.
    """
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['username']
        try:
            user = User.objects.get(username=user)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_403_FORBIDDEN)

        token, created = Token.objects.get_or_create(user=user)
        print(User.objects.get(username = user))
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class UserListView(generics.ListAPIView):
    queryset = User.objects.all() 
    serializer_class = UserSerializer  

    def get_queryset(self):
        return super().get_queryset()
    

class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)
