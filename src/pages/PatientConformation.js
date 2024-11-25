import { useLocation ,useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
export default function PatientConfirmation() {
    const location = useLocation();
    const {state}=useContext(AuthContext)
    const navigate=useNavigate()
    // Safely access the passed state and provide defaults to prevent errors
    const {
        patientId,
        name = '',
        species = '',
        breed = '',
        age = '',
        ownerName = '',
        ownerContact = '',
        medicalHistory = ''
    } = location.state || {};

    const handleNavigate=()=>{
        if(state.isLoggedIn){
            navigate('/')
        }else{
            navigate('/login')
        }
        
    }
    const handleNavigateAppointment=()=>{
        if(state.isLoggedIn){
            navigate('/appointment-form')
        }else{
            navigate('/login')
        }
        
    }
    return (
        <div className="container d-flex justify-content-center align-items-center ">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className="text-center mb-4">Patient Details for Confirmation</h2>
         {patientId ? (
                <div>
                    <p className='text-danger'><strong>Patient ID:</strong> {patientId}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Species:</strong> {species}</p>
                    <p><strong>Breed:</strong> {breed}</p>
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Owner Name:</strong> {ownerName}</p>
                    <p><strong>Owner Contact:</strong> {ownerContact}</p>
                    <p><strong>Medical History:</strong> {medicalHistory}</p>
                </div>
            ) : (
                <p>No patient details available.</p>
            )}
            <div className='text-start'>
                <button
                className="btn btn-primary mb-3"
                type='button'
                onClick={handleNavigateAppointment}
                >
                Appointment
            </button>
            {/* </div> */}
            {/* <div className='text-end'> */}
                <button
                className="btn btn-primary mb-3 text-end"
                type='button'
                onClick={handleNavigate}
                >
                Home Page
            </button>
            </div>
        </div>
    </div>
    );
}
