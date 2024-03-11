from rest_framework.permissions import BasePermission


class isFarmer(BasePermission):
    def has_permission(self, request, view):
        
        return bool(request.user and request.user.is_farmer)

class isGovernement(BasePermission):
    def has_permission(self, request, view):
        
        return bool(request.user and request.user.is_government)

class isNgo(BasePermission):
    def has_permission(self, request, view):
        
        return bool(request.user and request.user.is_ngo)