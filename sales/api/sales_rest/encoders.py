from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin","sold"]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name"]

class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "id"]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name"]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number"]

class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["price",
                  "automobile",
                  "salesperson",
                  "customer",]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }
