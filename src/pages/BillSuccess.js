import { useContext, useEffect, useState } from 'react';
import { useParams,useLocation} from 'react-router-dom';
import axios from '../components/axios';
import { format } from 'date-fns';
import AuthContext from '../context/AuthContext';

export default function BillSuccess() {
    const location = useLocation();
    const { id } = useParams();
    const [bill, setBill] = useState(null);
    const [error, setError] = useState('');
    const { state } = useContext(AuthContext);
    const ownerContact  = location.state?.ownerContact || bill?.ownerContact|| '';

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/generatebill/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBill(response.data)
                console.log("Fetched bill data:", response.data);
            } catch (error) {
                console.error('Error fetching single bill:', error.response ? error.response.data : error.message);
                setError('Failed to fetch bill data.');
            }
        };
        fetchBill();
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!bill) {
        return <div>Loading...</div>;
    }

    const formatBillDate = (dateString) => {
        if (!dateString) return 'Date is Not Available';
        try {
            const dateObj = new Date(dateString);
            return isNaN(dateObj) ? 'Invalid Date' : format(dateObj, 'dd/MM/yyyy');
        } catch {
            return 'Invalid Date';
        }
    };

    const formattedDate = bill.billingDate ? formatBillDate(bill.billingDate) : 'Date Not Available';

    const handleSendSMS = async () => {
        const message = `Hello ${bill.ownerName}, your bill for Patient ID: ${bill.patientId} is generated with a total cost of Rs.${bill.totalCost.toFixed(2)}.`;
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authorization token is missing. Please log in again.');
                return;
            }
            const response = await axios.post('/api/billsms', {
                ownerContact,
                message,
            },{headers: { Authorization: `Bearer ${token}` }});
            console.log(response.data.message);
            alert('SMS sent successfully!');
        } catch (error) {
            console.error('Error sending SMS:', error);
            alert('Failed to send SMS.');
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
                <h3 className="text-center mb-4 text-success">🎉 Bill Generated Successfully!</h3>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4 text-primary">Billing Details</h5>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <p><strong>Owner Name:</strong> {bill.ownerName}</p>
                                <p><strong>Owner Contact Number:</strong> {ownerContact}</p>
                                <p><strong>Patient ID:</strong> {bill.patientId}</p>
                                <p><strong>Medical Record ID:</strong> {bill.medicalRecordId}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Billing Date:</strong> {formattedDate}</p>
                                <p><strong>Payment Method:</strong> {bill.paymentMethod}</p>
                            </div>
                        </div>
                        <h6 className="text-center text-secondary mb-3">Services Provided</h6>
                        <ul className="list-group mb-3">
                            {bill.services.map((service, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    {service.serviceName}
                                    <span>Rs.{service.cost.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="alert alert-info text-center">
                            <h5 className="m-0">Total Cost: Rs.{bill.totalCost.toFixed(2)}</h5>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handleSendSMS}>Send SMS</button>
                  
                    </div>
                </div>
               
            </div>
        </div>
    );
}
