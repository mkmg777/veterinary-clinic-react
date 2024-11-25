import { useState,useContext } from "react"
import AuthContext from "../context/AuthContext"
import {  Alert, Spinner } from 'react-bootstrap'
export default function SearchPatient(){
    const {state,searchPatients}=useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState({})

    const handleSubmit=(e)=>{
        e.preventDefault()
        searchPatients(searchQuery)
    }

    return(
        <div className="container">
            <h2 className="text-center mb-4">Search for Patient</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="patientId">PatientId</label>
                <input type="text" id="patientId" placeholder="Enter Patient ID" value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <label htmlFor="contactnumber">Contact Number</label>
                <input type="Number" id="contactnumber" placeholder="Enter contact number" value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <label htmlFor="medicalrecordId">Medical Record Id</label>
                <input type="text" id="medicalrecordId" placeholder="Enter medical record ID" value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <input type="search" />          
            </form>
            {state.loading && <Spinner animation="border" variant="primary" />}
            {state.error && <Alert variant="danger">{state.error}</Alert>}
            {state.patientDetails && (
                <div className="mt-4">
                    <h4>Patient Details:</h4>
                    <p><strong>Name:</strong> {state.patientDetails.name}</p>
                    <p><strong>Species:</strong> {state.patientDetails.species}</p>
                    <p><strong>Breed:</strong> {state.patientDetails.breed}</p>
                    <p><strong>Age:</strong> {state.patientDetails.age}</p>
                    <p><strong>Owner Name:</strong> {state.patientDetails.ownerName}</p>
                    <p><strong>Owner Contact:</strong> {state.patientDetails.ownerContact}</p>
                    <p><strong>Medical History:</strong> {state.patientDetails.medicalHistory.length > 0 ? state.patientDetails.medicalHistory.join(', ') : 'No history available'}</p>
                </div>
            )}
        </div>
    )
}