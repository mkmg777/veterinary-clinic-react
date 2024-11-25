import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from '../components/axios';
import { format } from 'date-fns';

export default function AppointmentList() {
    const { state, listAppointments, setEditAppointments, deleteAppointment } = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedAppointment, setSelectedAppointment] = useState(null); // State to store selected appointment data
    const [show, setShow] = useState(false); // State to control modal visibility

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        listAppointments();
    }, [listAppointments]);

    if (state.loading) return <p>Loading appointments...</p>;
    if (state.error) return <p>{state.error}</p>;
    if (!state.appointments || state.appointments.length === 0) return <p>No appointments found</p>;

    const handleRemove = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this appointment?');
        if (confirm) {
            deleteAppointment(id);
        }
    };

    const handleShowDetails = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/appointments/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSelectedAppointment(response.data);
            handleShow(); // Open the modal after fetching appointment data
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (id) => {
        const appointmentToEdit = state.appointments.find(appointment => appointment._id === id);
        if (appointmentToEdit) {
            setEditAppointments(appointmentToEdit); // Pass the entire appointment object
            navigate('/appointment-form');
        }
    };

    const handleComplete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/appointments/${id}`, { status: 'completed' }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            listAppointments(); // Refetch the appointments list after completing one
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '1000px' }}>
                <h2 className="text-center mb-4">Appointment List</h2>
                {(!state.appointments || state.appointments.length === 0) ? (
                    <p>No appointments found</p>
                ) : (
                    <table className="table table-success table-striped-columns">
                        <thead>
                            <tr style={{textAlign:'center'}}>
                                <th>Serial No</th>
                                <th>Patient Owner Name</th>
                                <th>Actions</th>
                                <th>Status</th>
                                <th>Complete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {state.appointments.map((ele, index) => (
                                <tr key={ele._id} >
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td>{ele.ownerName}</td>
                                    <td style={{textAlign:'center'}}>
                                        <div className='btn-group'>
                                            <button className="btn btn-info" type='button' onClick={() => handleShowDetails(ele._id)}>Show</button>
                                            <button className="btn btn-primary" type='button' onClick={() => handleEdit(ele._id)}>Edit</button>
                                            <button className="btn btn-danger" type='button' onClick={() => handleRemove(ele._id)}>Delete</button>
                                        </div>
                                    </td>
                                    <td style={{textAlign:'center'}}>{ele.status}</td>
                                    <td style={{textAlign:'center'}}>
                                        {ele.status === 'scheduled' && (
                                            <button className="btn btn-success" type='button' onClick={() => handleComplete(ele._id)}>Complete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-danger'>Appointment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAppointment ? (
                            <>
                                <p><strong>Appointment Number:</strong> {selectedAppointment.appointmentNumber}</p>
                                <p><strong>Appointment ID:</strong> {selectedAppointment._id}</p>
                                <p><strong>Patient ID:</strong> {selectedAppointment.patient}</p>
                                <p><strong>Owner Name:</strong> {selectedAppointment.ownerName}</p>
                                <p><strong>Owner Contact Number:</strong> {selectedAppointment.ownerContact}</p>
                                <p><strong>Date:</strong> {format(new Date(selectedAppointment.date), 'dd/MM/yyyy')}</p>
                                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
                                <p><strong>Status:</strong> {selectedAppointment.status}</p>
                            </>
                        ) : (
                            <p>Loading appointment details...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
