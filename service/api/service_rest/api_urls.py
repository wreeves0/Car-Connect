from django.urls import path
from .views import api_appointment_detail, api_appointment_list, api_technician_list, api_technician_detail


urlpatterns = [
    path('appointments/', api_appointment_list, name='api_appointment_list'),
    path('appointments/<int:pk>/', api_appointment_detail, name='api_appointment_detail'),
    path('technicians/', api_technician_list, name='api_technician_list'),
    path('technicians/<int:pk>/', api_technician_detail, name='api_technician_detail')
]
