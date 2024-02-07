import React, { useEffect, useState } from "react";

function AppointmentForm() {
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, SetTime] = useState('');
    const [technician, setTechnician] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [reason, setReason] = useState('');
    const [hasCreatedAppointment, setHasCreatedAppointment] = useState(false);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        console.log("Technicians data:", data);
        setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date = date;
        data.time = time;
        data.technician = technician;
        data.reason = reason;


        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };

        try {
        const appointmentResponse = await fetch(appointmentUrl, fetchOptions);

        if (appointmentResponse.ok) {
            setVin("");
            setCustomer("");
            setDate("");
            setTime("");
            setTechnician([]);
            setReason("");
            setHasCreatedAppointment(true);
        } else {
            console.error("Failed to create appointment:", appointmentResponse.statusText);
        }
        } catch (error) {
        console.error("Fetch error:", error);
        }
    };

    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    };

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    };

    const handleChangeDate = (event) => {
        const value = event.target.value;
        setDate(value);
    };

    const handleChangeTime = (event) => {
        const value = event.target.value;
        setTime(value);
    };

    const handleChangeTechnician = (event) => {
        const value = event.target.value;
        setTechnician(value);
    };

    const handleChangeReason = (event) => {
        const value = event.target.value;
        setReason(value);
    };

    const spinnerClasses = "d-flex justify-content-center mb-3";

    let messageClasses = "alert alert-success d-none mb-0";
    let dropdownClasses = 'form-select';
    let formClasses = "";
    if (hasCreatedAppointment) {
        messageClasses = "alert alert-success mb-0";

    }

    return (
        <div className="my-5 container">
        <div className="row">
            <div className="col">
            <div className="card shadow">
                <div className="card-body">
                <form
                    className={formClasses}
                    onSubmit={handleSubmit}
                    id="create-appointment-form"
                >
                    <h1 className="card-title">Create a Service Appointment</h1>
                    <div className={spinnerClasses} id="loading-location-spinner">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="row">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChangeVin}
                        required
                        placeholder="Automobile Vin"
                        type="text"
                        id="vin"
                        name="vin"
                        className="form-control"
                        />
                        <label htmlFor="vin">Automobile Vin</label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChangeCustomer}
                        required
                        placeholder="Customer"
                        type="text"
                        id="customer"
                        name="customer"
                        className="form-control"
                        />
                        <label htmlFor="customer">Customer</label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-floating mb-3">
                        <label htmlFor="date_time">Date:</label>
                        <input
                        onChange={handleChangeDate}
                        required
                        type="date"
                        id="date"
                        name="date"
                        className="form-control"
                        />
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-floating mb-3">
                        <label htmlFor="date_time">Time:</label>
                        <input
                        onChange={handleChangeTime}
                        required
                        type="time"
                        id="time"
                        name="time"
                        className="form-control"
                        />
                    </div>
                    </div>
                    <div className="row">
                    <div className="mb-3">
                        <select
                        onChange={handleChangeTechnician}
                        name="technician"
                        id="technician"
                        className={dropdownClasses}
                        required
                        >
                        <option value="">Choose a Technician</option>
                        {technicians.map(technician => {
                        return(
                            <option
                            key={technician.id}
                            value={technician.id}
                            >
                            {technician.first_name}
                            </option>
                        )
                        })}
                        </select>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChangeReason}
                        required
                        placeholder="Reason"
                        type="text"
                        id="reason"
                        name="reason"
                        className="form-control"
                        />
                        <label htmlFor="reason">Reason</label>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create</button>
                </form>
                <div className={messageClasses} id="success-message">
                    Appointment has been created!
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AppointmentForm;
