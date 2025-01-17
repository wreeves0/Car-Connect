import React, { useState} from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: '',
    })


    const handleSumbit = async (event) => {
        event.preventDefault();

        console.log("Submit form data", formData)

        const url = 'http://localhost:8100/api/manufacturers/';

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a Manufacturer</h1>
              <form onSubmit={handleSumbit} id="create-manufacturer-form">

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )
    }

    export default ManufacturerForm
