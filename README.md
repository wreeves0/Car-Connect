# CarCar

Team:

* Kaitlyn Padermos - Service
* William Reeves - Sales

## Design

CarCar includes three different microservices that function together to provide a detailed look into a car dealership and it's inner workings.

Those microservices are:

Inventory
Services
Sales

## Diagram

HOW DO YOU PUT A PICTURE IN HERE?

## Service microservice

Explain your models and integration with the inventory
microservice, here.

The services microservice shows appointments and technicians associatied with the business CarCar. It provides a way to view a list of currect appointments, create a new appointment via a form and see service history. The list view of appointments allows for a way to change the status of the appointment to finished or cancelled, and updates in the service history to reflect this status change. This service history also has a search function, allowing you to search for a specific vin number to find the service history of a specific vin. The web app also provides a list view of technicians, as well as a form to create a new technician.

Models included:

Technician, Appointment, and AutomobileVO

Technician Model includes: first_name, last_name, and employee_id
Appointment Model includes: date_time, reason, status(inlcuding a dictionary of possible choices that can be assigned to an appointment), vin, customer, and a ForeignKey to the Technician Model

AutomobileVO Model includes: vin, sold, import_href

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

## How to Run This App

You need to have Docker, Git, and Node.js 18.2 or above

1. Fork the respository
2. Clone the forked repository to your local drive
3. Build and run the project with docker
4. Ensure your Docker containers are running before accessing the project in your browser via http://localhost:3000/


## API Documentation

Services API

Appointments

List All Appointments
URL: /appointments/
Method: GET
Description: Retrieve a list of all appointments
Success Response: A list of appointments

Get Appointment Details
URL: /appointments/<int:pk>/
Method: GET
Description: Retrieve details of a specific appointment by its ID (pk)
URL Parameters: pk (integer) - The ID of the appointment
Success Response: The appointment's details

Cancel Appointment
URL: /appointments/<int:pk>/cancel/
Method: POST
Description: Cancel a specific appointment by its ID (pk)
URL Parameters: pk (integer) - The ID of the appointment to cancel
Success Response: Confirmation that the appointment has been canceled


Finish Appointment
URL: /appointments/<int:pk>/finish/
Method: POST
Description: Mark a specific appointment by its ID (pk) as finished
URL Parameters: pk (integer) - The ID of the appointment to mark as finished
Success Response: Confirmation that the appointment has been marked as finished

Technicians

List All Technicians
URL: /technicians/
Method: GET
Description: Retrieve a list of all technicians
Success Response: A list of technicians

Get Technician Details
URL: /technicians/<int:pk>/
Method: GET
Description: Retrieve details of a specific technician by their ID (pk)
URL Parameters: pk (integer) - The ID of the technician
Success Response: The technician's details




Sales API

## Value Objects

AutomobileVO: This VO gets data from the inventory using a poller that polls data every 60 seconds for both the service microservice and sales microservice.

The service microservice polls the VIP status from inventory to show whether a vihicle has been purched through the CarCar sales feature when they have an appointment.
