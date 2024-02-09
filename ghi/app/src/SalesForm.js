import React, { useState, useEffect } from 'react';

function SalesForm() {
    const [formData, setFormData] = useState({
        automobile_id: '',
        salesperson_id: '',
        customer_id: '',
        price: '',
    });

    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    useEffect(() => {
        // Fetch data for dropdowns from the backend
        const fetchData = async () => {
            try {
                const salespersonsResponse = await fetch('http://localhost:8090/api/salespeople/');
                const customersResponse = await fetch('http://localhost:8090/api/customers/');
                const automobilesResponse = await fetch('http://localhost:8100/api/automobiles/');

                if (salespersonsResponse.ok && customersResponse.ok && automobilesResponse.ok) {
                    const salespersonsData = await salespersonsResponse.json();
                    const customersData = await customersResponse.json();
                    const automobilesData = await automobilesResponse.json();

                    setSalespersons(salespersonsData.salesperson || []);
                    setCustomers(customersData.customer || []);
                    const unsoldAutomobiles = automobilesData.autos.filter(automobile => !automobile.sold);
                    setAutomobiles(unsoldAutomobiles);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Submit form data", formData);

        const url = 'http://localhost:8090/api/sales/';

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                // Sale created successfully, now update automobile sold status
                await updateAutomobileSoldStatus(formData.automobile_id);
                // Reset form data
                setFormData({
                    automobile_id: '',
                    salesperson_id: '',
                    customer_id: '',
                    price: '',
                });
            } else {
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const updateAutomobileSoldStatus = async (automobileId) => {
        const updateUrl = `http://localhost:8100/api/automobiles/${automobileId}/sold`;

        try {
            const response = await fetch(updateUrl, { method: 'PUT' });
            if (!response.ok) {
                console.error('Failed to update automobile sold status:', response.statusText);
                // Optionally handle error here
            }
        } catch (error) {
            console.error('Error updating automobile sold status:', error);
            // Optionally handle error here
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="mb-3">
                            <label htmlFor="vin">Select VIN:</label>
                            <select onChange={handleFormChange} value={formData.automobile_id} required name="automobile_id" id="automobile_id" className="form-select">
                                <option value="">Choose a VIN</option>
                                {automobiles.map(automobile => (
                                    <option key={automobile.id} value={automobile.id}>{automobile.vin}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson">Select Salesperson:</label>
                            <select onChange={handleFormChange} value={formData.salesperson_id} required name="salesperson_id" id="salesperson_id" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespersons.map(salesperson => (
                                    <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer">Select Customer:</label>
                            <select onChange={handleFormChange} value={formData.customer_id} required name="customer_id" id="customer_id" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price:</label>
                            <input type="number" onChange={handleFormChange} value={formData.price} required name="price" id="price" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalesForm;
