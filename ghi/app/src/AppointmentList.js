import { useState, useEffect} from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([])

    const getData = async ()=> {
        const response = await fetch ('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const {appointments} = await response.json();
            setAppointments(appointments);

        } else{
            console.error('An error occured fetching the data')
        }
    }

    const [vipVins, setVipVins] = useState(new Set());

    const fetchVipVins = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/'); // Adjust the port and endpoint as necessary
        if (response.ok) {
        const data = await response.json();
        const vins = new Set(data.autos.map(auto => auto.vin)); // Assuming the structure is similar to what you've provided
        setVipVins(vins);
        } else {
        console.error('An error occurred fetching the VIP VINs');
        }
    };

    useEffect(()=> {
        getData()
    }, []);

    const handleCancel = (appointmentId) => {
        console.log(`Cancel appointment with ID ${appointmentId}`);
        };

    const handleFinish = (appointmentId) => {
        console.log(`Finish appointment with ID ${appointmentId}`);
        };

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
                    second: '2-digit',
                    hour12: true,
                });
                return (
                    <tr key={appointment.id}>
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer }</td>
                        <td>{ formattedDate }</td>
                        <td>{ formattedTime }</td>
                        <td>{ appointment.technician }</td>
                        <td>{ appointment.reason }</td>
                        <td>
                            <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                            <button onClick={() => handleFinish(appointment.id)}>Finished</button>
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
