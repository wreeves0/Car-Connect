import React, { useState } from "react";

function TechnicianForm() {
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [employee_id, setEmployee_Id] = useState('');
    const [hasCreatedTechnician, setHasCreatedTechnician] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
            data.first_name = first_name;
            data.last_name = last_name;
            data.employee_id = employee_id;


        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const technicianResponse = await fetch(technicianUrl, fetchOptions);

            if (technicianResponse.ok) {
                setFirst_Name("");
                setLast_Name("");
                setEmployee_Id("");
                setHasCreatedTechnician(true);
            } else {
                console.error("Failed to create technician:", technicianResponse.statusText);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirst_Name(value);
    };

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLast_Name(value);
    };

    const handleChangeEmployee_Id = (event) => {
        const value = event.target.value;
        setEmployee_Id(value);
    };

    // Define spinnerClasses
    const spinnerClasses = "d-flex justify-content-center mb-3";

    let messageClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    if (hasCreatedTechnician) {
        messageClasses = "alert alert-success mb-0";
        formClasses = "d-none";
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
                                id="create-technician-form"
                            >
                                <h1 className="card-title">Add a Technician</h1>
                                <div className={spinnerClasses} id="loading-location-spinner">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="row">
                                    <div className="row">
                                        <div className="form-floating mb-3">
                                            <input
                                                onChange={handleChangeFirstName}
                                                required
                                                placeholder="First Name"
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="form-control"
                                            />
                                            <label htmlFor="name">First Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-floating mb-3">
                                            <input
                                                onChange={handleChangeLastName}
                                                required
                                                placeholder="Last Name"
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className="form-control"
                                            />
                                            <label htmlFor="name">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-floating mb-3">
                                            <input
                                                onChange={handleChangeEmployee_Id}
                                                required
                                                placeholder="Employee Id"
                                                type="text"
                                                id="employeeId"
                                                name="employeeId"
                                                className="form-control"
                                            />
                                            <label htmlFor="name">Employee Id</label>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-lg btn-primary">
                                    Create
                                </button>
                            </form>
                            <div className={messageClasses} id="success-message">
                                Technician has been created!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
