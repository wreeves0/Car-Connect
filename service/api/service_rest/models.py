from django.db import models

# Create your models here.


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(null=True, unique=True)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Appointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    STATUS_CHOICES = [
        ('created', 'Created'),
        ('canceled', 'Canceled'),
        ('finished', 'Finished'),
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='created')
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
