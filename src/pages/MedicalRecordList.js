import {useContext,useEffect,useState} from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import axios from '../components/axios'
import {format} from 'date-fns'

export default function MedicalRecordList(){
    const {state,listMedicalRecords,setEditMedicalRecords,deleteMedicalRecord,handleLogout}=useContext(AuthContext)
   const navigate=useNavigate()
  
   const [selectedMedicalRecord,setSelectedMedicalRecord] =useState(null) // State to store selected patient data
   const [show,setShow]=useState(false) // State to control modal visibility

   const handleShow=()=>setShow(true)
   const handleClose=()=>setShow(false)

    useEffect(() => {
        listMedicalRecords();
    }, [listMedicalRecords]);


    if (state.loading) return <p>Loading patients...</p>;
    if (state.error) return <p>{state.error}</p>
    if (!state.medicalRecords|| state.medicalRecords.length === 0) return <p>No Medical Records found</p>;

    const handleremove=(id)=>{
        const confirm=window.confirm('Are you sure?')
        if(confirm){
            deleteMedicalRecord(id)
        }
    } 

    const handleNavigatePatientRecord=()=>{
        if(state.isLoggedIn){
            navigate('/medical-record-form')
        }else{
            navigate('/login')
        }
        
    }
    const handleNavigate=()=>{
        if(state.isLoggedIn){
            navigate('/')
        }else{
            navigate('/login')
        }
        
    }

    const handleshow = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/patientMedicalRecord/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log("Fetched medical record:", response.data)
            if (!response.data.patientId) {
                console.error('Patient ID is missing or invalid in the medical record.');
                throw new Error('Patient ID is missing.');
            }
            const patientResponse = await axios.get(`/api/patients/${response.data.patientId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!patientResponse.data || !patientResponse.data.ownerName) {
                console.error('Patient details or owner name not found.');
                throw new Error('Patient owner details not found.');
            }
            
            const medicalRecordWithOwnerName = {
                ...response.data,
                ownerName: patientResponse.data.ownerName||"N/A", // Assuming 'name' is the owner's name in the patient response
            }
            setSelectedMedicalRecord(medicalRecordWithOwnerName)
            // setSelectedMedicalRecord(response.data);
            handleShow(); 
        } catch (err) {
            console.log(err.response ? err.response.data : err.message); // Log more detailed error
            alert('Failed to fetch medical record or patient details.')
        }
    }

    // const handleBill = async (id) => {
        
    //     navigate(`/billing-form/${id}`)
    // }

    // const handleBill = async (id,patientId) => {
    //     navigate(`/billing-form/${id}`, { state: { medicalRecordId:id, patientId } });
    // }
    

    const handleEdit=(id)=>{
        setEditMedicalRecords(id)
        navigate('/medical-record-form')
    }

    return(
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
         
            <h2 className="text-center mb-4">Medical Record List</h2>
            {(!state.medicalRecords || state.medicalRecords.length === 0) ? (
                <p>No MedicalRecords found</p>
            ) : (
                <table className="table table-success table-striped-columns">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Serial No</th>
                            <th>Patient Owner Name</th>
                            <th>MedicalRecord Id</th>
                            <th>Actions</th>
                            {/* <th>Bill Generate</th> */}
                        </tr>
                    </thead>
                    {/* <tbody>
                        
                        {state.medicalRecords.map((ele,index) => (
                            <tr key={ele._id}>
                                <td>{index + 1}</td>
                                <td>{ele.ownerName}</td>
                                <td>{ele._id}</td>
                                <td> {
                                    <div className='btn-group-end'>
                                     <button
                                    className="btn btn-info"
                                    type='button'
                                    onClick={()=>{handleshow(ele._id)}}
                                    >
                                    Show
                                </button>
                                    <button
                                    className="btn btn-primary"
                                    type='button'
                                    onClick={()=>{handleEdit(ele)}}
                                    >
                                    Edit
                                </button>
                                
                                <button
                                className="btn btn-danger"
                                type='button'
                                onClick={()=>{handleremove(ele._id)}}
                                >
                                Delete
                            </button>
                            </div>
                            }</td>
                            <td>
                               { <div className='btn-group-end'>
                                     <button
                                    className="btn btn-warning"
                                    type='button'
                                    // onClick={()=>{handleBill(ele._id)}}
                                    onClick={() => { handleBill(ele._id, ele.patientId) }} 
                                    >
                                    Bill Generate
                                </button>
                                </div>}
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                     <tbody>
                        {/* Reverse the medical records before mapping */}
                        {state.medicalRecords.slice().reverse().map((ele, index) => (
                            <tr key={ele._id}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{ele.ownerName}</td>
                                <td>{ele._id}</td>
                                <td>
                                    <div className='btn-group-end'>
                                        <button
                                            className="btn btn-info"
                                            type='button'
                                            onClick={() => { handleshow(ele._id) }}
                                        >
                                            Show
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            type='button'
                                            onClick={() => { handleEdit(ele) }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type='button'
                                            onClick={() => { handleremove(ele._id) }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                                {/* <td>
                                    <div className='btn-group-end'>
                                        <button
                                            className="btn btn-warning"
                                            type='button'
                                            onClick={() => { handleBill(ele._id, ele.patientId) }}
                                        >
                                            Bill Generate
                                        </button>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'>Medical Record Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMedicalRecord ? (
                        <>
                            <p><strong>MedicalRecordId:</strong>{selectedMedicalRecord._id}</p>
                            <p><strong>PatientId:</strong>{ selectedMedicalRecord.patientId || 'N/A'}</p>
                            <p><strong>Owner Name:</strong>{selectedMedicalRecord.ownerName || 'N/A'}</p>
                            <p><strong>Date:</strong>{format(new Date(selectedMedicalRecord.date), 'dd/MM/yyyy')}</p>
                            <p><strong>Diagnosis:</strong>{selectedMedicalRecord.diagnosis}</p>
                            <p><strong>Treatment:</strong>{selectedMedicalRecord.treatment}</p>
                            <p><strong>Prescription:</strong>{selectedMedicalRecord.prescription}</p>
                            <p><strong>Next Visit Date:</strong>{new Date(selectedMedicalRecord.nextvisitdate).toLocaleDateString()}</p>
                            
                        </> 
                    ):(
                        <p>Loading Medical Record details...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
                

            </Modal>
             {/* {/* <div className='text-start'>
                <button
                className="btn btn-secondary mb-3 me-5"
                type='button'
                onClick={handleNavigatePatientRecord}
                >
                Appointment Record
            </button> */}
            {/* </div> */}
            {/* <div > 
                <button
                className="btn btn-primary mb-3 me-5 text-end"
                type='button'
                onClick={handleNavigate}
                >
                Home Page
            </button> */}
            {/* <button
                className="btn btn-primary mb-3  text-end"
                type='button'
                onClick={handleLogout}
                >
                Logout
            </button> */}
            {/* </div> */}
        </div>
    </div>
);   
}