from django.urls import path
from .views import api_appointment_detail, api_appointment_list, api_technician_list, api_technician_detail, api_appointment_cancel, api_appointment_finish


urlpatterns = [
    path('appointments/', api_appointment_list, name='api_appointment_list'),
    path('appointments/<int:pk>/', api_appointment_detail, name='api_appointment_detail'),
    path('technicians/', api_technician_list, name='api_technician_list'),
    path('technicians/<int:pk>/', api_technician_detail, name='api_technician_detail'),
    path('appointments/<int:pk>/cancel/', api_appointment_cancel, name='api_appointment_cancel'),
    path('appointments/<int:pk>/finish/', api_appointment_finish, name='api_appointment_finish'),
]
