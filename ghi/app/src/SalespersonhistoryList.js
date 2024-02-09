import React, { useState, useEffect } from 'react';

function SalespersonhistoryList() {
    const [sales, setSales] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    const getData = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        const salesResponse = await fetch(salesUrl);
        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            setSales(salesData.sales || []);
        }

        const salespersonsUrl = 'http://localhost:8090/api/salespeople/';
        const salespersonsResponse = await fetch(salespersonsUrl);
        if (salespersonsResponse.ok) {
            const salespersonsData = await salespersonsResponse.json();
            setSalespersons(salespersonsData.salesperson || []);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSalespersonChange = (event) => {
        const selectedId = event.target.value;
        setSelectedSalesperson(selectedId);
    };

    return (
        <div>
            <h1>Salesperson History</h1>
            <label htmlFor="salesperson">Select Salesperson:</label>
            <select id="salesperson" value={selectedSalesperson} onChange={handleSalespersonChange}>
                <option value="">-- Select Salesperson --</option>
                {salespersons.map((salesperson) => (
                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                    .filter((sale) => !selectedSalesperson || sale.salesperson.employee_id === selectedSalesperson)
                        .map((sale) => (
                            <tr key={`${sale.salesperson.employee_id}-${sale.id}`}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalespersonhistoryList;
