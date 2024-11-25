import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from '../components/axios';
import { toast } from 'react-toastify';

export default function BillingForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { createBill, updateBill, state } = useContext(AuthContext);
    const { id } = useParams();

    const [patientId, setPatientId] = useState(location.state?.patientId || '');
    const [ownerName, setOwnerName] = useState(location.state?.ownerName || '');
    const [medicalRecordId, setMedicalRecordId] = useState(location.state?.medicalRecordId || '');
    const [services, setServices] = useState([{ serviceName: '', cost: 0 }]);
    const [billingDate, setBillingDate] = useState(location.state?.billingDate || '')
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [totalCost, setTotalCost] = useState(0);
    const [billingId, setBillingId] = useState(null); // Store billing ID here
    const [ownerContact,setOwnerContact]=useState(location.state?.ownerContact || '')

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const loadScript = async () => {
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                alert('Razorpay SDK failed to load. Are you online?');
            }
        };

        loadScript();
    }, []);

    useEffect(() => {
        const calculatedTotalCost = services.reduce((acc, service) => acc + (parseFloat(service.cost) || 0), 0);
        setTotalCost(calculatedTotalCost);
    }, [services]);

    const handleServiceChange = (index, e) => {
        const updatedServices = [...services];
        updatedServices[index][e.target.name] = e.target.value;
        setServices(updatedServices);
    };

    const addService = () => {
        setServices([...services, { serviceName: '', cost: 0 }]);
    };

    const removeService = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };
    const handlePayment = async (orderId) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: totalCost , // Amount in paise
            currency: 'INR',
            name: 'Veterinary Clinic',
            description: 'Bill Payment',
            order_id: orderId,
            handler: async function (response) {
                const paymentId = response.razorpay_payment_id; // Capture the payment ID
                console.log("Razorpay Payment ID: ", paymentId);
                // Process the payment on the server
                await processPayment(billingId, paymentId);
            },
            theme: {
                color: '#F37254',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleBillingSubmit = async (e) => {
        e.preventDefault();

        const billData = {
            patientId,
            ownerName,
            ownerContact,
            medicalRecordId,
            billingDate: billingDate || new Date(),
            services: services.map((service) => ({
                serviceName: service.serviceName,
                cost: parseFloat(service.cost) || 0,
            })),
            paymentMethod,
            totalCost,
        };
        try {
            let response;
            if (state.editId) {
                response = await updateBill(state.editId, billData);
            } else {
                response = await createBill(billData);
            }
              if (response && response.billing) {
                const billingId = response.billing._id; // Access the billing ID directly
    
                if (billingId) {
                    if (paymentMethod === 'online') {
                        if (totalCost <= 0) {
                            toast('Total cost must be greater than zero.');
                            return;
                        }
                        // Create order with Razorpay and handle payment
                        const orderResponse = await axios.post('/api/create-order', { amount: totalCost, receipt_id: billingId });
                        const { orderId } = orderResponse.data; // Get the order ID
                        handlePayment(orderId); // Trigger payment
                        
                    } else {
                        toast('Bill created successfully');
                    }
                    const token = localStorage.getItem('token')
                    const billingResponse = await axios.get(`/api/generatebill/${billingId}`,{
                        headers: { Authorization: `Bearer ${token}` }})
                    navigate(`/bill-success/${billingId}`,{ state: { patientId, ownerName, ownerContact }})
                } else {
                    toast('Error: Billing ID not found in response.');
                }
            } else {
                toast('Error: Billing information could not be retrieved.');
            }
        } catch (error) {
            console.error('Error handling bill:', error);
            toast('Error creating bill: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const processPayment = async (billingId, paymentId) => {
        
        try {
            const token = localStorage.getItem('token');
    
            // Check if payment has already been processed
            const paymentStatusResponse = await axios.get(`/api/payment-status/${paymentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (paymentStatusResponse.data.status === 'captured') {
                toast('Payment already captured. Redirecting...');
                navigate(`/bill-success/${billingId}`,{state:{patientId,ownerName,ownerContact }})
                return; // Exit if payment is already captured
            }

    
            const response = await axios.post(`/api/generatebill/${billingId}`, { paymentId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Server Response:', response.data); // Inspect this to see the structure

    
            if (response.status === 200) {
                toast('Payment Successful');
                navigate(`/bill-success/${billingId}`,{state:{patientId,ownerName,ownerContact}})
            } else {
                throw new Error('Payment processing failed on server.');
            }
        } catch (error) {
            console.error('Error processing payment on server', error);
            toast('Payment processing failed: ' + (error.response ? error.response.data.errorMessage : error.message));
        }
    };
    
    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
                <h3 className="text-center mb-4">
                    {state.editId ? 'Edit Billing Information' : 'Create Billing Information'}
                </h3>
                <form onSubmit={handleBillingSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientId"><strong>Patient ID :</strong></label>
                        <input
                            id="patientId"
                            type="text"
                            className="form-control"
                            placeholder="Enter patient ID"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerName"><strong>Owner Name :</strong></label>
                        <input
                            id="ownerName"
                            type="text"
                            className="form-control"
                            placeholder="Enter owner name"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerContact"><strong>Owner Contact Number :</strong></label>
                        <input
                            id="ownerContact"
                            type="text"
                            className="form-control"
                            placeholder="Enter owner contact number"
                            value={ownerContact}
                            onChange={(e) => setOwnerContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medicalRecordId"><strong>Medical Record ID :</strong></label>
                        <input
                            id="medicalRecordId"
                            type="text"
                            className="form-control"
                            placeholder="Enter medical record ID"
                            value={medicalRecordId}
                            onChange={(e) => setMedicalRecordId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="billingDate"><strong>Enter Billing Date :</strong></label>
                        <input
                            type="date"
                            id="billingDate"
                            className="form-control"
                            value={billingDate.split('/').reverse().join('-')}
                            onChange={(e) => setBillingDate(e.target.value.split('-').reverse().join('/'))} // Format to DD/MM/YYYY
                            required
                        />
                    </div>
                    {services.map((service, index) => (
                        <div key={index} className="form-row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="serviceName"
                                    className="form-control"
                                    placeholder="Service Name"
                                    value={service.serviceName}
                                    onChange={(e) => handleServiceChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    name="cost"
                                    className="form-control"
                                    placeholder="Cost"
                                    value={service.cost}
                                    onChange={(e) => handleServiceChange(index, e)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeService(index)}
                            >
                                Remove Service
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mb-3" onClick={addService}>
                        Add Another Service
                    </button>
                    <div className="form-group">
                        <label htmlFor="totalCost"><strong>Total Cost :</strong></label>
                        <input
                            id="totalCost"
                            type="number"
                            className="form-control"
                            value={totalCost}
                            readOnly
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="paymentMethod"><strong>Payment Method :</strong></label>
                        <select
                            id="paymentMethod"
                            className="form-control"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {state.editId ? 'Update Billing' : 'Create Billing'}
                    </button>
                </form>
            </div>
        </div>
    );
}
