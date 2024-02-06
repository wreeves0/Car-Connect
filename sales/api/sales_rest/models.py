from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)

class Sale(models.Model):
    price = models.PositiveSmallIntegerField(null=True)
    automobile = models.ForeignKey(AutomobileVO, related_name="automobiles", on_delete=models.CASCADE)
    salesperson = models.ForeignKey(Salesperson, related_name="salespersons", on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name="customers", on_delete=models.CASCADE)
