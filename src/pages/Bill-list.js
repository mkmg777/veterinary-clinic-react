// import { useContext,useEffect,useState } from "react"
// import AuthContext from "../context/AuthContext"
// import { Button,Modal } from "react-bootstrap"
// import { useNavigate } from "react-router-dom"
// import axios from "../components/axios"
// import {format} from 'date-fns'

// export default function BillList(){
//     const { state, ListBill, setEditBill, deleteBill } = useContext(AuthContext);
//   const [show, setShow] = useState(false); // State to control modal visibility
//   const [selectedBill, setSelectedBill] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     ListBill(); // Fetch bills when the component is mounted
//   }, [ListBill]);

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   const handleremove = (id) => {
//     const confirm = window.confirm("Are you sure?");
//     if (confirm) {
//       deleteBill(id);
//     }
//   };

//   const handleshow = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`/api/generatebill/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSelectedBill(response.data); // Set selected bill data
//       handleShow(); // Open the modal after fetching the bill
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEdit = (bill) => {
//     setEditBill(bill._id); // Set the bill to be edited
//     navigate(`/billing-form/${bill._id}`, { state: bill }); // Navigate to the edit form with the bill ID
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "1000px" }}>
//         <h2 className="text-center mb-4">Bill List</h2>
//         {(!state.bills || state.bills.length === 0) ? (
//           <p>No Bills found</p>
//         ) : (
//           <table className="table table-success table-striped-columns">
//             <thead>
//             <tr>
//                 <th>Sl No.</th>
//               <th>Patient ID</th>
//               <th>Owner Name</th>
//               <th>Medical Record ID</th>
//               <th>Date</th>
//               {/* <th>Services</th>
//               <th>Total Cost</th>
//               <th>Payment Method</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//               {state.bills.map((bill, index) => (
//                 <tr key={bill._id}>
//                   <td>{index + 1}</td>
//                   <td>{bill.patientId}</td>
//                   <td>{bill.ownerName}</td>
//                   <td>{bill.medicalRecordId}</td>
//                   <td>{new Date(bill.date).toLocaleDateString()}</td>
//                   {/* <td>{bill.date ? new Date(bill.date).toLocaleDateString() : 'N/A'}</td> */}
//                 {/* <td>{new Date(bill.date).toLocaleDateString()}</td> */}
//                 {/* <td>
//                     <ul>
//                   {bill.services.map((service) => (
//                     <div key={service.serviceName}>
//                       <li>{service.serviceName} - {service.cost}</li>  
//                     </div>
//                   ))}</ul>
//                 </td>
//                 <td>{bill.totalCost.toFixed(2)}</td>
//                 <td>{bill.paymentMethod}</td> */}
//                   <td>
//                     <div className="btn-group">
//                       <Button className="btn btn-info" onClick={() => handleshow(bill._id)}>
//                         Show
//                       </Button>
//                       <Button className="btn btn-primary" onClick={() => handleEdit(bill)}>
//                         Edit
//                       </Button>
//                       <Button className="btn btn-danger" onClick={() => handleremove(bill._id)}>
//                         Delete
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Modal to show selected bill details */}
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Bill Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedBill ? (
//             <div>
//               <p><b>Owner Name:</b> {selectedBill.ownerName}</p>
//               <p><b>Bill ID: </b>{selectedBill._id}</p>
//               <p><b>PatientId:</b>{selectedBill.patientId}</p>
//               <p><b>MedicalRecordID:</b>{selectedBill.medicalRecordId}</p>
//               {/* <p><b>Date:</b>{format(new Date(selectedBill.date),'dd/MM/yyyy')}</p> */}
//               {/* <p><b>Date:</b>
//         {selectedBill.date ? (
//           format(new Date(selectedBill.date), 'dd/MM/yyyy')
//         ) : (
//           'N/A'
//         )}
//       </p> */}
//       <p><b>Date:</b> {selectedBill.date ? format(new Date(selectedBill.date), 'dd/MM/yyyy') : 'N/A'}</p>
             
//         {/* <p><b>Date:</b> {format(new Date(selectedBill.date), 'dd/MM/yyyy')}</p> */}
             
//               <p><b>Services:</b>
//               <ul>
//                   {selectedBill.services.map((service,index) => (
//                     <div >
//                        <li key={index}>
//                           {service.serviceName} - Rs.{service.cost.toFixed(2)}
//                       </li>
//                       {/* <li>{service.serviceName} - {service.cost}</li>   */}
//                     </div>
//                   ))}
//                   </ul> </p>
//                 <p><b>Total Cost:</b> {selectedBill.totalCost ? selectedBill.totalCost.toFixed(2) : 'N/A'}</p>
//                 {/* <p><b>Payment Method:</b> {selectedBill.paymentMethod}</p> */}
//                 <p><strong>Payment Method:</strong> {typeof selectedBill.paymentMethod === 'string' ? selectedBill.paymentMethod : 'N/A'}</p>

//                 </div>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../components/axios";
import { format, parseISO } from 'date-fns';

export default function BillList() {
  const { state, ListBill, setEditBill, deleteBill } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ListBill(); // Fetch bills when the component is mounted
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleremove = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      deleteBill(id);
    }
  };

  const handleshow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/generatebill/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedBill(response.data);
      handleShow();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (bill) => {
    setEditBill(bill._id);
    navigate(`/billing-form/${bill._id}`, { state: bill });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "1000px" }}>
        <h2 className="text-center mb-4">Bills List</h2>
        {(!state.bills || state.bills.length === 0) ? (
          <p>No Bills found</p>
        ) : (
          <table className="table table-success table-striped-columns">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th >Sl No.</th>
                <th >Patient ID</th>
                <th>Owner Name</th>
                <th>Medical Record ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.bills.map((bill, index) => (
                <tr key={bill._id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>{bill.patientId}</td>
                  <td>{bill.ownerName}</td>
                  <td>{bill.medicalRecordId}</td>
                  <td>
                    {bill.billingDate ? (
                      format(parseISO(bill.billingDate), 'dd/MM/yyyy')
                    ) : 'No Date Provided'}
                  </td>
                  <td>
                    <div className="btn-group">
                      <Button className="btn btn-info" onClick={() => handleshow(bill._id)}>
                        Show
                      </Button>
                      {/* <Button className="btn btn-primary" onClick={() => handleEdit(bill)}>
                        Edit
                      </Button> */}
                      <Button className="btn btn-danger" onClick={() => handleremove(bill._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal to show selected bill details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBill ? (
            <div>
              <p><b>Owner Name:</b> {selectedBill.ownerName}</p>
              <p><b>Bill ID:</b> {selectedBill._id}</p>
              <p><b>Patient ID:</b> {selectedBill.patientId}</p>
              <p><b>Medical Record ID:</b> {selectedBill.medicalRecordId}</p>
              <p><b>Date:</b> {selectedBill.billingDate ? format(parseISO(selectedBill.billingDate), 'dd/MM/yyyy') : 'N/A'}</p>
              <p><b>Services:</b>
                
                  {Array.isArray(selectedBill.services) && selectedBill.services.length > 0 ? (
                    selectedBill.services.map((service, index) => (
                      <li key={index}>
                        <span>{service.serviceName ? service.serviceName : 'N/A'}</span> - 
                        <span> Rs.{typeof service.cost === 'number' ? service.cost.toFixed(2) : 'N/A'}</span>
                      </li>
                    ))
                  ) : (
                    <li>No services found.</li>
                  )}
                
              </p>
              <p><b>Total Cost:</b> Rs.{typeof selectedBill.totalCost === 'number' ? selectedBill.totalCost.toFixed(2) : 'N/A'}</p>
              <p><strong>Payment Method:</strong> {typeof selectedBill.paymentMethod === 'string' ? selectedBill.paymentMethod : 'N/A'}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
