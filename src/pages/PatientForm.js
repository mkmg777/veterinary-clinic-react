import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export default function PatientForm(){
    const {addPatient,state,updatePatient,dispatch,fetchPatientDetails}=useContext(AuthContext)
    const navigate=useNavigate()

    const [name,setName]=useState('')
    const [species,setSpecies]=useState('')
    const [breed,setBreed]=useState('')
    const [age,setAge]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [ownerContact,setOwnerContact]=useState('')
    const [medicalHistory,setMedicalHistory]=useState([])
    const [patientclientErrors,setPatientClientError]=useState({})
    const clientErrors={}
   
    useEffect(() => {
        console.log("Current Edit Patient Object:", state.editPatient);  // Debugging the editPatient state
        
        const fetchPatientData = () => {
            if (state.editPatient) {
                console.log("Filling form with patient details:", state.editPatient);  // Debugging form pre-fill
                
                // Prefill the form fields with patient details
                setName(state.editPatient.name || '');
                setSpecies(state.editPatient.species || '');
                setBreed(state.editPatient.breed || '');
                setAge(state.editPatient.age || '');
                setOwnerName(state.editPatient.ownerName || '');
                setOwnerContact(state.editPatient.ownerContact || '');
                setMedicalHistory(state.editPatient.medicalHistory || []);
            } else {
                console.log("No patient to edit, resetting form.");
                // Reset form if no edit patient
                setName('');
                setSpecies('');
                setBreed('');
                setAge('');
                setOwnerName('');
                setOwnerContact('');
                setMedicalHistory([]);
            }
        };
        
        fetchPatientData();
    }, [state.editPatient]);
    
    

    const runClientSideValidations=()=>{
        // const clientErrors={}
        if(name.trim().length===0){
            clientErrors.name="patient cannot be empty"
        }
        if(species.trim().length===0){
            clientErrors.species="species cannot be empty"
        }
        if(breed.trim().length===0){
            clientErrors.breed="breed cannot be empty"
        }
        if(age.length===0){
            clientErrors.age="age cannot be empty"
        }
        if(ownerName.trim().length===0){
            clientErrors.ownerName="ownerName cannot be empty"
        }
        if(ownerContact.length===0){
            clientErrors.ownerContact="owner contact cannot be empty"
        }
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
            name,species,breed,age,ownerName,ownerContact,medicalHistory,            
        }
        runClientSideValidations()
        if(Object.keys(clientErrors).length===0){
            try{
            let newPatientId
            if(state.editPatient){
                    await updatePatient(state.editPatient._id,formData)
                    dispatch({ type: 'SET_EDIT_PATIENT', payload: null })
                    navigate('/patients-list')
             }else{
                    newPatientId= await addPatient(formData)
                    if (!newPatientId) {
                        console.error("Error: Patient ID is not returned");
                        return; // Exit if patient ID is not available
                    }             
            setName('')
            setSpecies('')
            setBreed('')
            setAge('')
            setOwnerName('')
            setOwnerContact('')
            setMedicalHistory([])

            navigate('/patient-confirmation',{
                state:{
                    patientId: newPatientId,
                    name,
                    species,
                    breed,
                    age,
                    ownerName,
                    ownerContact,
                    medicalHistory,
                }
            })
        }
     } 
    catch(err){
        console.log("error during submission",err)
     }
    }else{
            setPatientClientError(clientErrors)
        }
    }
   
    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
            <h2 className="text-center mb-4">{state.editId ? 'Edit ' : 'Add '}Patient Registration Form</h2>
            {state.error && (
              <div className="alert alert-danger">
              <h3>Server Error</h3>
              <ul>
                  {state.error.map((ele, i) => (
                      <li key={i}>{ele.msg}</li>
                  ))}
              </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
            {/* {(state.user.role==='admin' || state.user.role==='employee') && (
                <>
                <div className='d-flex justify-content-between mt-3 mb-4'>
                <div className='text-start'>
                <button
                className="btn btn-info"
                type='button'
                onClick={handleList}
                >
                Patients List 
                </button>
                </div>
                </div>
            </>
            )} */}
            
              <div className="form-group mb-3">
              <label htmlFor='name' ><strong>Enter Pet Name :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {patientclientErrors.name && <p className='text-danger'>{patientclientErrors.name}</p>}
              </div>

              <div className="form-group mb-3">
              <label htmlFor='species' ><strong>Enter Species :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="enter species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              {patientclientErrors.species && <p className='text-danger'>{patientclientErrors.species}</p>} </div>

              <div className="form-group mb-3">
              <label htmlFor='breed' ><strong>Enter Breed :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="enter breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
             {patientclientErrors.breed && <p className='text-danger'>{patientclientErrors.breed}</p>} </div>

              <div className="form-group mb-3">
              <label htmlFor='age' ><strong>Enter Patient Age :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="enter age in year"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {patientclientErrors.age && <p className='text-danger'>{patientclientErrors.age}</p>} </div>
              <div className="form-group mb-3">
              <label htmlFor='ownerName' ><strong>Enter Patient Owner Name :</strong></label>
              <input
                type="ownerName"
                className="form-control"
                placeholder="patient ownername"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              {patientclientErrors.ownerName && <p className='text-danger'>{patientclientErrors.ownerName}</p>}</div>

              <div className="form-group mb-3">
              <label htmlFor='contact' ><strong>Enter Patient Owner Contact :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="patient owner contact"
                value={ownerContact}
                onChange={(e) => setOwnerContact(e.target.value)}
              />
             {patientclientErrors.ownerContact && <p className='text-danger'>{patientclientErrors.ownerContact}</p>} </div>

             <div className="form-group mb-3">
              <label htmlFor='medicalhistory' ><strong>Enter Medical History :</strong></label>
              <input
                type="text"
                className="form-control"
                placeholder="medical history"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              />
              </div>

              <div className="text-center mt-3">
                <button
                className="btn btn-success"
                type='submit'
                >{state.editPatient ? 'Updated Patient Account' : 'Create New Patient Account'}
                
            </button>
            </div>
                       
            </form>
            </div>
        </div>
    )
}