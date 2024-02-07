from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Technician, Appointment
import json

# Create your views here.


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
    ]

    def get_extra_data(self, o):
        return {
            "technician": o.technician.employee_id,
            "date_time": o.date_time.isoformat() if o.date_time else None
        }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
    ]

    encoders = {
        "technician": TechnicianDetailEncoder
    }


@require_http_methods(["GET", "POST"])
def api_technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        technician_data = TechnicianListEncoder().default(technician)
        return JsonResponse(
            technician_data,
            encoder=TechnicianListEncoder
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_technician_detail(request, pk):
    try:
        technician = Technician.objects.get(id=pk)

        if request.method == "GET":
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianDetailEncoder,
            )
        elif request.method == "PUT":
            content = json.loads(request.body)
            technician.first_name = content.get("first_name", technician.first_name)
            technician.last_name = content.get("last_name", technician.last_name)
            technician.employee_id = content.get("employee_id", technician.employee_id)

            technician.save()

            return JsonResponse(
                {"message": "Technician updated successfully"},
                safe=False,
            )
        elif request.method == "DELETE":
            count, _ = Technician.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician not found"},
            status=404,
        )


@require_http_methods(["GET", "POST"])
def api_appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                {"appointment": appointment},
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_detail(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)

        if request.method == "GET":
            return JsonResponse(
                {"appointment": appointment},
                encoder=AppointmentDetailEncoder
            )
        elif request.method == "PUT":
            content = json.loads(request.body)
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician

            appointment.date_time = content["date_time"]
            appointment.reason = content["reason"]
            new_status = content.get("status")
            if new_status in ['cancelled', 'finished']:
                appointment.status = new_status
            else:
                return JsonResponse(
                    {"message": "Invalid status"},
                    status=400,
                )
            appointment.vin = content["vin"]
            appointment.customer = content["customer"]

            appointment.save()

            return JsonResponse(
                {"appointment": appointment},
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        elif request.method == "DELETE":
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment not found"},
            status=404,
        )
