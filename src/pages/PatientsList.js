// import {useContext,useEffect,useState} from 'react'
// import AuthContext from '../context/AuthContext'
// import {useNavigate} from 'react-router-dom'
// import { Button, Modal } from 'react-bootstrap'
// import axios from '../components/axios'


// export default function PatientList(){
//     const {searchPatient,state,listPatients,deletePatients,setEditPatient}=useContext(AuthContext)
//    const navigate=useNavigate()
  
//    const [selectedPatient,setSelectedPatient] =useState(null) // State to store selected patient data
//    const [show,setShow]=useState(false) // State to control modal visibility
//     const [searchPatientId,setSearchPatientId]=useState('')

//    const handleShow=()=>setShow(true)
//    const handleClose=()=>setShow(false)

//     useEffect(() => {
//         listPatients();
//     }, [listPatients]);


//     if (state.loading) return <p>Loading patients...</p>;
//     if (state.error) return <p>{state.error}</p>
//     if (!state.patients || state.patients.length === 0) return <p>No patients found</p>;

//     const handleremove=(id)=>{
//         const confirm=window.confirm('Are you sure?')
//         if(confirm){
//             deletePatients(id)
//         }
//     } 

//     const handleNavigatePatientRecord=()=>{
//         if(state.isLoggedIn){
//             navigate('/patient-record')
//         }else{
//             navigate('/login')
//         }
        
//     }
//     const handleNavigate=()=>{
//         if(state.isLoggedIn){
//             navigate('/')
//         }else{
//             navigate('/login')
//         }
        
//     }

//     const handleshow=async(id)=>{
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`/api/patients/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             setSelectedPatient(response.data);
//             handleShow() // Open the modal after fetching patient data
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const handleEdit=(id)=>{
//         setEditPatient(id)
//         navigate('/patient-record')
//     }

//     return(
//         <div className="container d-flex justify-content-center align-items-center min-vh-100">
//           <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
         
//             <h2 className="text-center mb-4">Patients List</h2>
//            {/* Search input for Patient ID */}
//            <label htmlFor="search"><b>Search by PatientId:</b></label>
//                 <input
//                     type="text"
//                     id="search"
//                     placeholder="Enter PatientId"
//                     className="align-center mb-3 mt-2"
//                     style={{ width: "50%" }}
//                     value={searchPatientId}
//                     onChange={(e) => setSearchPatientId(e.target.value)} // Update search state
//                 />
//                 <Button onClick={handleSearch} variant="primary" className="mb-3">Search Patient</Button>

           
//             {(!state.patients || state.patients.length === 0) ? (
//                 <p>No patients found</p>
//             ) : (
//                 <>
//                 {/* <label htmlFor='search'><b>Search:</b></label>
//                 <input type="text" id="search" placeholder='Search by PatientId' className='align-center mb-3 mt-2' style={{width:"50%" }} value={searchPatientId} onClick={(e)=>{setSearchPatientId(e.target.value)}}/>
//                 <button type="search" id="search" placeholder='Search by PatientId' className='align-center mb-3 mt-2' style={{width:"50%" }} >patient</button> */}
                
//                 <table className="table table-success table-striped-columns">
//                     <thead>
//                         <tr>
//                             <th>Patient Owner Name</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {state.patients.map((patient) => (
//                             <tr key={patient._id}>
//                                 <td>{patient.ownerName}</td>
//                                 <td> {
//                                     <div className='btn-group-end'>
//                                      <button
//                                     className="btn btn-info"
//                                     type='button'
//                                     onClick={()=>{handleshow(patient._id)}}
//                                     >
//                                     Show
//                                 </button>
//                                     <button
//                                     className="btn btn-primary"
//                                     type='button'
//                                     onClick={()=>{handleEdit(patient)}}
//                                     >
//                                     Edit
//                                 </button>
                                
//                                 <button
//                                 className="btn btn-danger"
//                                 type='button'
//                                 onClick={()=>{handleremove(patient._id)}}
//                                 >
//                                 Delete
//                             </button>
//                             </div>}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 </>
//             )}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title className='text-danger'>Patient Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedPatient ? (
//                         <>
//                             <p><strong>PatientId:</strong>{selectedPatient._id}</p>
//                             <p><strong>Name:</strong>{selectedPatient.name}</p>
//                             <p><strong>Species:</strong>{selectedPatient.species}</p>
//                             <p><strong>Breed:</strong>{selectedPatient.breed}</p>
//                             <p><strong>Age:</strong>{selectedPatient.age}</p>
//                             <p><strong>Owner Name:</strong>{selectedPatient.ownerName}</p>
//                             <p><strong>Owner Contact:</strong>{selectedPatient.ownerContact}</p>
//                             <p><strong>Medical History:</strong>{selectedPatient.medicalHistory}</p>
//                         </>
//                     ):(
//                         <p>Loading patient details...</p>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='secondary' onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
                

//             </Modal>
//              <div className='text-start'>
//                 <button
//                 className="btn btn-secondary mb-3"
//                 type='button'
//                 onClick={handleNavigatePatientRecord}
//                 >
//                 Patient Registration Form
//             </button>
//             {/* </div> */}
//             {/* <div className='text-end'> */}
//                 <button
//                 className="btn btn-primary mb-3 text-end"
//                 type='button'
//                 onClick={handleNavigate}
//                 >
//                 Home Page
//             </button>
//             </div>
//         </div>
//     </div>
// );   
// }

import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from '../components/axios';

export default function PatientList() {
    const { state, listPatients, deletePatients, setEditPatient} = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient data
    const [show, setShow] = useState(false); // State to control modal visibility
    const [searchPatientId, setSearchPatientId] = useState(''); // State to store patient ID entered in search

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Fetch all patients when the component mounts
    useEffect(() => {
        listPatients();
    }, [listPatients]);

    // Function to show patient details in a modal
    const handleShowDetails = async (id) => {
        try {
            const token = localStorage.getItem('token')
            console.log("Token: ", token)
            const response = await axios.get(`/api/patients/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data)
            setSelectedPatient(response.data);
            handleShow(); // Open the modal after fetching patient data
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = (id) => {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
            deletePatients(id);
        }
    };

    
    const handleEdit = (patient) => {
        console.log("Selected Patient for Editing:", patient);  // Debugging the selected patient object
        setEditPatient(patient);  // Pass the entire patient object to the state
        navigate('/patient-record');  // Navigate to the patient form
    };
    
    // Filter patients based on searchPatientId
    const filteredPatients = state.patients.filter(patient =>
        patient._id.includes(searchPatientId) // Use includes to match any part of the patient ID
    );

    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
                <h2 className="text-center mb-4">Patients List</h2>

                {/* Search input for Patient ID */}
                <label htmlFor="search"><b>Search by PatientId:</b></label>
                <input
                    type="text"
                    id="search"
                    placeholder="Enter PatientId"
                    className="align-center mb-3 mt-2"
                    style={{ width: "50%" }}
                    value={searchPatientId}
                    onChange={(e) => setSearchPatientId(e.target.value)} // Update search state
                />

                {/* Display filtered patient list */}
                {(!filteredPatients || filteredPatients.length === 0) ? (
                    <p>No patients found</p>
                ) : (
                    <table className="table table-success table-striped-columns ">
                        <thead>
                            <tr>
                                <th style={{textAlign:'center'}}>P.NO</th>
                                <th>Patient ID</th>
                                <th>Patient Owner Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='table table-success table-striped-columns'>
                            {filteredPatients.map((patient,index) => (
                                <tr key={patient._id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td>{patient._id}</td>
                                    <td>{patient.ownerName}</td>
                                    <td>
                                        <div className="btn-group-end">
                                            <button
                                                className="btn btn-info"
                                                type="button"
                                                onClick={() => { handleShowDetails(patient._id) }}
                                            >
                                                Show
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={() => { handleEdit(patient) }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => { handleRemove(patient._id) }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Modal to display selected patient details */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Patient Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {selectedPatient ? (
                        <>
                            <p><strong>Patient ID:</strong> {selectedPatient._id}</p>
                            <p><strong>Name:</strong> {selectedPatient.name}</p>
                            <p><strong>Species:</strong> {selectedPatient.species}</p>
                            <p><strong>Breed:</strong> {selectedPatient.breed}</p>
                            <p><strong>Age:</strong> {selectedPatient.age}</p>
                            <p><strong>Owner Name:</strong> {selectedPatient.ownerName}</p>
                            <p><strong>Owner Contact:</strong> {selectedPatient.ownerContact}</p>
                            
                            <h5 className="mt-3">Medical History:</h5>
                            {Array.isArray(selectedPatient.medicalHistory) && selectedPatient.medicalHistory.length > 0 ? (
                                <table className="table table-bordered mt-2">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Diagnosis</th>
                                            <th>Treatment</th>
                                            <th>Next Visit Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPatient.medicalHistory.map((record) => (
                                            <tr key={record._id}>
                                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                                <td>{record.diagnosis}</td>
                                                <td>{record.treatment}</td>
                                                <td>{record.nextvisitdate ? new Date(record.nextvisitdate).toLocaleDateString() : 'N/A'}</td> {/* Next Visit date */}
                                              </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No medical history available.</p>
                            )}
                        </>
                    ) : (
                        <p>Loading patient details...</p>
                    )}
                </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Navigation buttons */}
                {/* <div className="text-start">
                    <button
                        className="btn btn-secondary mb-3"
                        type="button"
                        onClick={() => navigate('/patient-record')}
                    >
                        Patient Registration Form
                    </button>
                    <button
                        className="btn btn-primary mb-3 text-end"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Home Page
                    </button>
                </div> */}
            </div>
        </div>
    );
}
