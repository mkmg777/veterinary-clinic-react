import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/AuthContext'

import {useNavigate,useLocation} from 'react-router-dom'
export default function MedicalRecordForm(){
    const navigate=useNavigate()
    const location=useLocation()
    const [patientId,setPatientId]=useState('')
    const [date,setDate]=useState('')
    const [diagnosis,setdiagnosis]=useState('')
    const [treatment,settreatment]=useState('')
    const [prescription,setprescription]=useState('')
    const [nextvisitdate,setnextvisitdate]=useState('')
    const [patientclientErrors,setPatientClientError]=useState({})
    const [ownerName, setOwnerName] = useState('')
    const [ownerContact,setOwnerContact]=useState('')
    

    const clientErrors={}
    
    const {addMedicalRecord,state,updateMedicalRecord,dispatch}=useContext(AuthContext)

    useEffect(() => {
        if (location.state) {
            console.log('Location state received:', location.state); // Debug log
        }
        if (location.state && location.state.patientId) {
            console.log('Patient ID found:', location.state.patientId); // Debug log
            setPatientId(location.state.patientId || '');
        }
        if (location.state?.ownerName) {
            console.log('Owner Name found:', location.state.ownerName); // Debug log
            setOwnerName(location.state.ownerName || ''); // Set ownerName
        }
        if (location.state?.ownerContact) {
            console.log('Owner Name found:', location.state.ownerContact); // Debug log
            setOwnerContact(location.state.ownerContact || ''); // Set ownerName
        }
        else {
            console.warn('No location state found'); // Debug log for when location.state is null
        }
    }, [location.state])

    useEffect(() => {
       
        if (state.editId) {
            setPatientId(state.editId.patientId);
            setDate(state.editId.date);
            setdiagnosis(state.editId.diagnosis);
            settreatment(state.editId.treatment);
            setprescription(state.editId.prescription)
            setnextvisitdate(state.editId.nextvisitdate)
        } else {
            if (!location.state?.patientId) {
                setPatientId('');
            }
            setDate('');
            setdiagnosis('');
            settreatment('');
            setprescription('')
            setnextvisitdate('')
        }
    }, [state.editId ,location.state?.patientId]);
    

    const runClientSideValidations=()=>{
        if(patientId.trim().length===0){
            clientErrors.patientId="patientId cannot be empty"
        }
        if(date.trim().length===0){
            clientErrors.date="date cannot be empty"
        }
        if(diagnosis.trim().length===0){
            clientErrors.diagnosis="diagnosis cannot be empty"
        }
        if(treatment.length===0){
            clientErrors.treatment="treatment cannot be empty"
        }
        if(prescription.length===0){
            clientErrors.prescription="prescription cannot be empty"
        }
    }
   
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formattedDate = date.split('T')[0]
        const formData={
           patientId,
           date:formattedDate,
           diagnosis,
           treatment,
           prescription,
           nextvisitdate,
           ownerName,
           ownerContact
        }
        runClientSideValidations()
        if(Object.keys(clientErrors).length===0){
            // let newAppointment
            if(state.editId){
                    await updateMedicalRecord(state.editId._id,formData)
                    dispatch({type:'SET_EDIT_MEDICAL_RECORD',payload:null})
                    navigate('/medical-record-list')
             }else{

                const newRecordId = await addMedicalRecord(formData); // Assuming this function is defined as earlier
                if (newRecordId) {
                    navigate(`/billing-form/${patientId}`,{
                        state: { 
                            patientId,
                            ownerName,
                             ownerContact,
                            medicalRecordId: newRecordId // Assuming this is the ID returned when a new record is created
                        }
                    });
                }
                    setPatientId('');
                    setDate('');
                    setdiagnosis('');
                    settreatment('');
                    setprescription('')
                    setnextvisitdate('')
                }
        }
        else{
            setPatientClientError(clientErrors)
        }
    }
    
     return(
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
            <h2 className="text-center mb-4">{state.editId ? 'Edit' : 'Add '}Medical Record Form</h2>
            {state.error && (
              <div className="alert alert-danger">
              <h3>Server Error</h3>
              {state.error.msg}
               {/* <ul>
                  {state.error.map((ele, i) => (
                      <li key={i}>{ele.msg}</li>
                  ))}
              </ul> */}
              </div>
            )}
             {patientId && (
            <form onSubmit={handleSubmit}>
            
            <div className="form-group mb-3">
              <label htmlFor='name' >Enter Pet Id</label>
              <input
                id='name'
                type="text"
                className="form-control"
                placeholder="enter patient Id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              {patientclientErrors.patientId && <p className='text-danger'>{patientclientErrors.patientId}</p>}
              </div>
             
              <div className="form-group mb-3">
              <label htmlFor='date' >Enter Date</label>
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
              <label htmlFor='diagnosis' >Enter Diagnosis</label>
              <input
                id='diagnosis'
                type="text"
                className="form-control"
                placeholder="enter diagnosis"
                value={diagnosis}
                onChange={(e) => setdiagnosis(e.target.value)}
              />
              {patientclientErrors.diagnosis && <p className='text-danger'>{patientclientErrors.diagnosis}</p>}
              </div>

              <div className="form-group mb-3">
              <label htmlFor='treatment' >Enter Treatment</label>
              <input
                type="text"
                id="treatment"
                className="form-control"
                placeholder="enter Treatment"
                value={treatment}
                onChange={(e) => settreatment(e.target.value)}
              />
              {patientclientErrors.treatment && <p className='text-danger'>{patientclientErrors.treatment}</p>}
              </div>

              <div className="form-group mb-3">
              <label htmlFor='prescription' >Enter Prescription</label>
              <input
                type="text"
                id="prescription"
                className="form-control"
                placeholder="enter prescription"
                value={prescription}
                onChange={(e) => setprescription(e.target.value)}
              />
              {patientclientErrors.prescription && <p className='text-danger'>{patientclientErrors.prescription}</p>}
              </div>

              <div className="form-group mb-3">
              <label htmlFor='nextvisitdate' >Enter Next Visit Date</label>
              <input
                type="date"
                id="nextvisitdate"
                className="form-control"
                placeholder="enter nextvisitdate"
                value={nextvisitdate}
                onChange={(e) => setnextvisitdate(e.target.value)}
              />
              {/* {patientclientErrors.prescription && <p className='text-danger'>{patientclientErrors.prescription}</p>} */}
              </div>
              <div className="text-center mt-3">
                <button
                className="btn btn-success"
                type='submit'
                >
                    {state.editId ? 'Updated Medical Record' : 'Create New Medical Record'}
                
            </button>
            </div>
            
            </form>
             )}
             {/* {!patientId && <p>Loading patient ID...</p>} Show loading message while waiting for state */}
        
        </div>
        </div>
    )
}