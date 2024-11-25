import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from '../components/axios'

export default function AppointmentForm(){
    const navigate=useNavigate()
    const [patient,setPatient]=useState('')
    const [date,setDate]=useState('')
    const [time,setTime]=useState('')
    const [reason,setReason]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [patientclientErrors,setPatientClientError]=useState({})
    const clientErrors={}
    const [ownerContact, setOwnerContact] = useState('')
    
    const {addAppointment,state,updateAppointment,dispatch,handleLogout}=useContext(AuthContext)

    const clearForm=()=>{
            setPatient('');
            setDate('');
            setTime('');
            setReason('');
            setOwnerName('')
            setOwnerContact('')
    }

    useEffect(() => {
        if (state.ownerContact) {
            setOwnerContact(state.ownerContact);
            setPatient(state.patient);
        }
    }, [state.ownerContact, state.patient])

    useEffect(() => {
        if (state.editId) {
            setPatient(state.editId.patient);
            setDate(state.editId.date);
            setTime(state.editId.time);
            setReason(state.editId.reason);
            setOwnerName(state.editId.ownerName);
            setOwnerContact(state.editId.ownerContact)
        } else {
            clearForm()
        }
    }, [state.editId]);
    

    const runClientSideValidations=()=>{
        if(patient.trim().length===0){
            clientErrors.patient="patient cannot be empty"
        }
        if(date.trim().length===0){
            clientErrors.date="date cannot be empty"
        }
        if(time.trim().length===0){
            clientErrors.time="time cannot be empty"
        }
        if(reason.length===0){
            clientErrors.reason="reason cannot be empty"
        }
        if(ownerName.length===0){
            clientErrors.ownerName="owner name cannot be empty"
        }
        if(ownerContact.length===0){
            clientErrors.ownerContact="owner contact cannot be empty"
        }
    }
       
    const handleContactChange = async (e) => {
        let contactNumber = e.target.value;
    
        // Format contact number to match database
        if (contactNumber.startsWith("+91")) {
            contactNumber = contactNumber.slice(1);
        } else if (!contactNumber.startsWith("91")) {
            contactNumber = `91${contactNumber}`;
        }
    
        setOwnerContact(contactNumber);
        console.log("Corrected formatted contact number:", contactNumber);
    
        if (contactNumber.length === 12) {
            try {
                const token = localStorage.getItem('token');
                console.log("Sending request with token:", token);
    
                const response = await axios.get(`/api/patients`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { contact: contactNumber }
                });
    
                console.log("API response data:", response.data);
                if (response.status === 200 && response.data.length > 0) {
                    // Find a matching patient
                    const matchingPatient = response.data.find(patient => patient.ownerContact.toString() === contactNumber);
    
                    if (matchingPatient) {
                        console.log("Fetched patient data:", matchingPatient);
                        setPatient(matchingPatient._id);
                        setOwnerName(matchingPatient.ownerName);
                        setDate(matchingPatient.date || '');
                        setTime(matchingPatient.time || '');
                        setReason(matchingPatient.reason || '');
                    } else {
                        clearForm()
                    }
                } else {
                    clearForm()
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
                if (error.response) {
                    console.error('Server responded with error:', error.response.data);
                } else {
                    console.error('Network or other error:', error.message);
                }
            }
        }
    }; 

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
           patient,
           date,
           time:time,
           reason,
           ownerName,
           ownerContact
        }
        runClientSideValidations()
        if(Object.keys(clientErrors).length===0){
            if(state.editId){
                    await updateAppointment(state.editId._id,formData)
                    dispatch({type:'SET_EDIT_APPOINTMENTS',payload:null})
                    navigate('/appointment-list')
             }else{
                const newRecordId =await addAppointment(formData)
                  if (newRecordId) {
                    navigate('/appointment-list'); 
                }
                    clearForm()
                }
        }
        else{
            setPatientClientError(clientErrors)
        }
    }
   
    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px',minHeight:'100%' ,maxHeight:'1900px' }}>
            <h2 className="text-center mb-4">{state.editId ? 'Edit ' : 'Add '}Appointment </h2>
            {state.error && typeof state.error === 'string' &&(
              <div className="alert alert-danger">
              <h3>Server Error</h3>
              {/* <p>{state.error.msg}</p> */}
              <ul>
                  {state.error.map((ele, i) => (
                      <li key={i}>{ele.msg}</li>
                  ))}
              </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
            
            <div className="form-group mb-3">
            <div className="form-group mb-3">
                <label htmlFor='ownerContact' ><strong>Enter Owner Contact :</strong></label>
                <input
                       id='ownerContact'
                       type="text"
                       className="form-control"
                       placeholder="Enter owner's contact number (+91)"
                       value={ownerContact || ''} 
                       onChange={handleContactChange}                                              
                />
                {patientclientErrors.ownerContact && <p className='text-danger'>{patientclientErrors.ownerContact}</p>}
                </div>
              <label htmlFor='name' ><strong>Enter Pet Id :</strong></label>
              <input
                id='name'
                type="text"
                className="form-control"
                placeholder="enter patient Id"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              />
              {patientclientErrors.patient && <p className='text-danger'>{patientclientErrors.patient}</p>}
              </div>
              <div className="form-group mb-3">
              <label htmlFor='ownername' ><strong>Enter Owner Name :</strong></label>
              <input
                id='ownername'
                type="text"
                className="form-control"
                placeholder="enter owner name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              {patientclientErrors.ownerName && <p className='text-danger'>{patientclientErrors.ownerName}</p>}
              </div>
              

              <div className="form-group mb-3">
              <label htmlFor='date' ><strong>Enter Date :</strong></label>
              <input
                type="date"
                id="date"
                className="form-control"
                placeholder="enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {patientclientErrors.date && <p className='text-danger'>{patientclientErrors.date}</p>}
              </div>
              <div className="form-group mb-3">
              <label htmlFor='time' ><strong>Enter Time :</strong></label>
              <input
                type="time"
                id="time"
                className="form-control"
                placeholder="enter Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              {patientclientErrors.time && <p className='text-danger'>{patientclientErrors.time}</p>}
              </div>
              <div className="form-group mb-3">
              <label htmlFor='reason' ><strong>Enter Reason :</strong></label>
              <input
                type="text"
                id="reason"
                className="form-control"
                placeholder="enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              {patientclientErrors.reason && <p className='text-danger'>{patientclientErrors.reason}</p>}
              </div>

              
              <div className="text-center mt-3">
                <button
                className="btn btn-success"
                type='submit'
                >
                    {state.editId ? 'Updated Patient Appointment' : 'Create New Patient Appointment'}
                
            </button>
            </div>
        </form>
        </div>
        </div>
    )
}