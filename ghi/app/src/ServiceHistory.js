import { useState, useEffect } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [vipVins, setVipVins] = useState(new Set());

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
        const { appointments } = await response.json();
        setAppointments(appointments);
        setFilteredAppointments(appointments); // Initially set filteredAppointments to all appointments
        } else {
        console.error('An error occurred fetching the data');
        }
    };

    const fetchVipVins = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
        const data = await response.json();
        const vins = new Set(data.autos.map((auto) => auto.vin));
        setVipVins(vins);
        } else {
        console.error('An error occurred fetching the VIP VINs');
        }
    };

    const handleSearch = () => {
        const searchTerm = searchVIN.trim().toLowerCase();
        const filtered = appointments.filter((appointment) =>
        appointment.vin.toLowerCase().includes(searchTerm)
        );
        setFilteredAppointments(filtered);
    };

    useEffect(() => {
        getData();
        fetchVipVins();
    }, []);

    return (
        <div className="column">
        <div className="row">
            <h1>Appointments</h1>

            <div>
            <label>VIN:</label>
            <input
                type="text"
                value={searchVIN}
                onChange={(e) => setSearchVIN(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            </div>

            <table className="table">
            <thead>
                <tr>
                <th>VIN</th>
                <th>Is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map((appointment) => {
                const isVip = vipVins.has(appointment.vin) ? 'Yes ⭐' : 'No';
                const date = new Date(appointment.date_time);

                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                });

                return (
                    <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{isVip}</td>
                    <td>{appointment.customer}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{appointment.technician}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default ServiceHistory;
