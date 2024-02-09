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

![Alt text](<design_image.png>)

## Diagram

HOW DO YOU PUT A PICTURE IN HERE?

## Inventory microservice

The inventory microservice shows manufacturers, vehicle models, and automobiles associated with the business CarCar. It provides a way to view a list of manufacturers and create a new one. The vehicle and automobile portion of the app similarly provide a way to view a list of vehicles and automobiles and forms for each to create a new instance of vehicle and automobile.

Models included:

Manufacturer, VehicleModel, and Automobile

Manufacturer Model includes: name

VehicleModel includes: name, picture_url, and a ForeignKey manufacturer to the Manufacturer model

Automobile includes: color, year, vin, sold (a BooleanField with a default set to False), and a ForeignKey model to the Model model

## Service microservice

Explain your models and integration with the inventory
microservice, here.

The services microservice shows appointments and technicians associatied with the business CarCar. It provides a way to view a list of currect appointments, create a new appointment via a form and see service history. The list view of appointments allows for a way to change the status of the appointment to finished or cancelled, and updates in the service history to reflect this status change. This service history also has a search function, allowing you to search for a specific vin number to find the service history of a specific vin. The web app also provides a list view of technicians, as well as a form to create a new technician.

Models included:

Technician, Appointment, and AutomobileVO

Technician Model includes: first_name, last_name, and employee_id

Appointment Model includes: date_time, reason, status(inlcuding a dictionary of possible choices that can be assigned to an appointment), vin, customer, and a ForeignKey technician to the Technician model

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

Inventory API

---Automobiles---

List All Automobiles
URL: /automobiles/
Method: GET
Description: Shows a list of all automobiles in the database
Success Response: Returns a list of automobile objects

Get Automobile Details
URL: /automobiles/<str:vin>/
Method: GET
Description: Shows detailed information for a specific automobile identified by its VIN
URL Parameters: vin (string) - The VIN of the automobile
Success Response: Shows the automobile's details

---Manufacturers---

List All Manufacturers
URL: /manufacturers/
Method: GET
Description: Shows a list of all vehicle manufacturers
Success Response: Returns a JSON array of manufacturer objects

Get Manufacturer Details
URL: /manufacturers/<int:pk>/
Method: GET
Description: Shows detailed information for a specific manufacturer by its ID
URL Parameters: pk (integer) - The ID of the manufacturer
Success Response: Shows the manufacturer's details



---Vehicle Models---

List All Vehicle Models
URL: /models/
Method: GET
Description: Shows a list of all vehicle models
Success Response: Returns a JSON array of vehicle model objects

Get Vehicle Model Details
URL: /models/<int:pk>/
Method: GET
Description: Shows detailed information for a specific vehicle model by its ID
URL Parameters: pk (integer) - The ID of the vehicle model
Success Response: Shows the vehicle model's details
____________________




Services API

---Appointments---

List All Appointments
URL: /appointments/
Method: GET
Description: Retrieve a list of all appointments
Success Response: Returns a list of appointments

Get Appointment Details
URL: /appointments/<int:pk>/
Method: GET
Description: Retrieve details of a specific appointment by its ID (pk)
URL Parameters: pk (integer) - The ID of the appointment
Success Response: Shows the appointment's details

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

---Technicians---

List All Technicians
URL: /technicians/
Method: GET
Description: Retrieve a list of all technicians
Success Response: Returns a list of technicians

Get Technician Details
URL: /technicians/<int:pk>/
Method: GET
Description: Retrieve details of a specific technician by their ID (pk)
URL Parameters: pk (integer) - The ID of the technician
Success Response: Shows the technician's details




Sales API

## Value Objects

AutomobileVO: This VO gets data from the inventory using a poller that polls data every 60 seconds for both the service microservice and sales microservice.

The service microservice polls the VIP status from inventory to show whether a vihicle has been purched through the CarCar sales feature when they have an appointment.
