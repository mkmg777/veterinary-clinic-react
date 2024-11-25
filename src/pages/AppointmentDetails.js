import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../components/axios';
import { Container, Card, Button, Modal, Row, Col, Table } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

export default function AppointmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch, deleteAppointment } = useContext(AuthContext);
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [patientDetails, setPatientDetails] = useState(null);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/appointments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointment(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    const removeAppointment = async () => {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
            deleteAppointment(id);
        }
        navigate('/appointment-calendar');
    };

    const handleAddMedicalRecord = () => {
        if (appointment) {
            navigate('/medical-record-form', {
                state: {
                    patientId: appointment.patient,
                    appointmentId: appointment._id,
                    ownerName: appointment.ownerName || '',
                    ownerContact:appointment.ownerContact || ''
                },
            });
        } else {
            console.error('Appointment data is not available.');
        }
    };

    const handleShowHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/patients/${appointment.patient}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPatientDetails(response.data);
            setShowHistoryModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCloseHistory = () => setShowHistoryModal(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;
    if (!appointment) return <p>No appointment found.</p>;

    return (
        <Container fluid className="mt-5">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="bg-light shadow p-3">
                    <h5 style={{textAlign:'center'}} class="fw-bolder my-3">Quick Actions</h5>
                    <div className="shadow-sm">
                    <Button variant="success" onClick={handleAddMedicalRecord} className="my-4 w-100">
                        Add Medical Record
                    </Button>
                    <Button variant="info" onClick={handleShowHistory} className="my-4 w-100">
                        Patient History
                    </Button>
                    <Button variant="danger" onClick={removeAppointment} className="my-4 w-100">
                        Delete Appointment
                    </Button>
                    </div>
                </Col>

                {/* Main Content */}
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <h2 className="text-center">Appointment Details</h2>
                        </Card.Header>
                        <Card.Body>
                            <Row md={6}>
                                <Col md={12}>
                                    <p><strong>Appointment Number:</strong> {appointment.appointmentNumber}</p>
                                    <p><strong>Appointment ID:</strong> {appointment._id}</p>
                                    <p><strong>Patient ID:</strong> {appointment.patient}</p>
                                    <p><strong>Patient Owner Name:</strong> {appointment.ownerName}</p>
                                    <p><strong>Patient Owner Contact Number:</strong> {appointment.ownerContact}</p>
                                    <p><strong>Reason:</strong> {appointment.reason}</p>                                                             
                                    <p><strong>Appointment Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <p><strong>Status:</strong> {appointment.status}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Patient History Modal */}
            <Modal show={showHistoryModal} onHide={handleCloseHistory} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Patient Details and Medical History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {patientDetails ? (
                        <>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Name:</strong> {patientDetails.name}</p>
                                    <p><strong>Species:</strong> {patientDetails.species}</p>
                                    <p><strong>Breed:</strong> {patientDetails.breed}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Age:</strong> {patientDetails.age}</p>
                                    <p><strong>Owner:</strong> {patientDetails.ownerName}</p>
                                    <p><strong>Contact:</strong> {patientDetails.ownerContact}</p>
                                </Col>
                            </Row>
                            <h5 className="mt-3">Medical History</h5>
                            <Table striped bordered hover className="mt-2">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Diagnosis</th>
                                        <th>Treatment</th>
                                        <th>Next Visit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientDetails.medicalHistory.map(record => (
                                        <tr key={record._id}>
                                            <td>{new Date(record.date).toLocaleDateString()}</td>
                                            <td>{record.diagnosis}</td>
                                            <td>{record.treatment}</td>
                                            <td>{record.nextvisitdate ? new Date(record.nextvisitdate).toLocaleDateString() : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <p>Loading patient details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseHistory}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
