import { useState, useEffect } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [vipVins, setVipVins] = useState(new Set());

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            // Filter out appointments with statuses 'canceled' or 'finished'
            const activeAppointments = data.appointments.filter(appointment => appointment.status !== 'canceled' && appointment.status !== 'finished');
            setAppointments(activeAppointments);
        } else {
            console.error('An error occurred fetching the data');
        }
    };

    const fetchVipVins = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            const vins = new Set(data.autos.map(auto => auto.vin));
            setVipVins(vins);
        } else {
            console.error('An error occurred fetching the VIP VINs');
        }
    };

    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        let endpoint = '';
        switch (newStatus) {
            case 'finished':
                endpoint = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
                break;
            case 'canceled':
                endpoint = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
                break;
            default:
                console.error('Invalid status update attempt');
                return;
        }

        const response = await fetch(endpoint, {
            method: 'POST',
        });

        if (response.ok) {
            // Refresh data to reflect the change in status
            getData();
        } else {
            console.error('Failed to update appointment status');
        }
    };

    useEffect(() => {
        getData();
        fetchVipVins();
    }, []);

    return (
        <div className="column">
            <div className="row">
                <h1>Appointments</h1>

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
                        {appointments.map(appointment => {
                            const isVip = vipVins.has(appointment.vin) ? "Yes ⭐" : "No";
                            const date = new Date(appointment.date_time);
                            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                            const formattedTime = date.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
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
                                    <td>
                                        <button onClick={() => updateAppointmentStatus(appointment.id, 'finished')}>Finish</button>
                                        <button onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}>Cancel</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentList;
