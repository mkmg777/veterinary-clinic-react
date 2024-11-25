import {useReducer,useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from './axios'
import {toast} from 'react-toastify'
import { useCallback } from 'react'

const initialState = {
    user: null,
    isLoggedIn:false,
    loading:false,
    error:null,
    message:null,
    editId:null,
    appointments: [],
    patients: [],
    medicalRecords: [],
    employees: [],
    bills:[],
    currentBill:null,
    patientDetails:null,
    medicalHistory:null,
    editPatient:null
  }

  const reducer = (state, action) => {
    console.log('Action Type:', action.type);
    console.log('Action Payload:', action.payload);

    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {...state,user:action.payload,isLoggedIn:true,error:null,message:'Registration successful',loading:false}

        case 'AUTH_ERROR':
            return{...state,error:action.payload,loading:false}
        case 'CLEAR_MESSAGE':
                return { ...state,message: null,error: null }
                case 'LOADING_START':
                    return {
                        ...state,
                        loading: true
                    };
                
                case 'LOADING_END':
                    return {
                        ...state,
                        loading: false
                    };
                    case 'LOGIN_USER':
                        return {
                            ...state,
                            user: action.payload, // Set the user from action payload
                            isLoggedIn: true,
                            loading: false,
                            error: null,
                        };
                    case 'LOGOUT_USER':
                        return {
                            ...state,
                            user: null,
                            isLoggedIn: false,
                            error: null,
                        };
        
        // case 'LOGIN_USER':
        //     return { ...state, user: action.payload, isLoggedIn: true,loading: false,error:null };
        // case 'LOGOUT_USER':
        //     return { ...state, user: null, isLoggedIn: false ,error:null};
        case 'REQUEST_PASSWORD_RESET':
                return { ...state, loading: true, error: null, message: null };
        case 'PASSWORD_RESET_SUCCESS':
                return { ...state, loading: false, message: action.payload, error: null };
        case 'PASSWORD_RESET_FAILURE':
                return { ...state, loading: false, error: action.payload, message: null };
    
    
        case 'FETCH_PATIENTS_REQUEST':
                return { ...state, loading: true, error: null };  // Start loading
        case 'FETCH_PATIENTS_SUCCESS':
                return { ...state, loading: false, patients: action.payload, error: null };  // Load patients
        case 'FETCH_PATIENTS_FAILURE':
                return { ...state, loading: false, error: action.payload };
        
        case 'ADD_PATIENT':
                return { 
                    ...state, 
                    patients: [...state.patients, action.payload]  // Ensure patients is spread correctly
                }
        // case 'SET_EDIT_PATIENT':{
        //         return {...state,editId:action.payload}
        //          }
        case 'SET_EDIT_PATIENT':
            return {
                ...state,
                editPatient: action.payload, // Storing the entire patient object in state
            }
        case 'UPDATE_PATIENT':
                return {
                    ...state,
                    editPatient: null,  // Clear editId after update
                    patients: state.patients.map(patient =>
                        patient._id === action.payload._id ? action.payload : patient
                    ),
                }
        case 'DELETE_PATIENT':
                return {
                      ...state,
                      patients: state.patients.filter((patient) => patient._id !== action.payload),
                }

        case 'FETCH_APPOINTMENT_REQUEST':
                return { ...state, loading: true, error: null };  // Start loading
        case 'FETCH_APPOINTMENT_SUCCESS':
                return { ...state, loading: false, appointments: action.payload, error: null };  // Load patients
        case 'FETCH_APPOINTMENT_FAILURE':
                return { ...state, loading: false, error: action.payload };
        case 'ADD_APPOINTMENT':
                return{ ...state,appointments:[...state.appointments,action.payload]}       
        case 'DELETE_APPOINTMENT': {
                return { ...state, appointments: state.appointments.filter(appointment => appointment._id !== action.payload) };
                }
        case 'SET_EDIT_APPOINTMENTS':{
                return {...state,editId:action.payload}
                }
        case 'UPDATE_APPOINTMENTS':
                return {
                    ...state,
                    editId: null,  // Clear editId after update
                    appointments: state.appointments.map(appointment =>
                    appointment._id === action.payload._id ? action.payload : appointment
                    ),
                }

        case 'FETCH_MEDICAL_RECORDS_REQUEST':
                return { ...state, loading: true, error: null }
        case 'FETCH_MEDICAL_RECORDS_SUCCESS':
                return { ...state, loading: false, medicalRecords: action.payload }
        case 'FETCH_MEDICAL_RECORDS_FAILURE':
                return { ...state, loading: false, error: action.payload }
        case 'ADD_MEDICAL_RECORD':
                return{ ...state,medicalRecords:[...state.medicalRecords,action.payload]}       
        case 'DELETE_MEDICAL_RECORD': {
                return { ...state,medicalRecords: state.medicalRecords.filter(record => record._id !== action.payload) };
                }
        case 'SET_EDIT_MEDICAL_RECORD':{
                return {...state,editId:action.payload}
                }
        case 'UPDATE_MEDICAL_RECORD':
                return {
                    ...state,
                    editId: null,  // Clear editId after update
                    medicalRecords: state.medicalRecords.map(record =>
                    record._id === action.payload._id ? action.payload : record
                    ),
                }

        case 'SEARCH_PATIENT_REQUEST':
                return { ...state, loading: true, error: null };
        case 'SEARCH_PATIENT_SUCCESS':
                return { loading: false, error: null, patientDetails: action.payload };
        case 'SEARCH_PATIENT_FAILURE':
                return { loading: false, error: action.payload, patientDetails: null };
        
                case 'FETCH_BILLS':
                    return { ...state, bills: action.payload };
                case 'CREATE_BILL':
                    return { ...state, bills: [...state.bills, action.payload] };
                case 'FETCH_SINGLE_BILL':
                    return { ...state, currentBill: action.payload };
                case 'SET_EDIT_BILL':
                    return { ...state, editId: action.payload };
                case 'UPDATE_BILL':
                    return {
                        ...state,
                        editId: null,
                        bills: state.bills.map(bill =>
                            bill._id === action.payload._id ? action.payload : bill
                        ),
                    };
                case 'DELETE_BILL':
                    return {
                        ...state,
                        bills: state.bills.filter(bill => bill._id !== action.payload),
                    }

                    case 'SEARCH_PATIENT':
                        return {
                            ...state,
                            patient: action.payload.patient,
                            // medicalHistory: action.payload.medicalHistory,
                            loading: false,
                        }
        default:
            return state;
    }
};

function AuthProvider(props){
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
    
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         dispatch({ type: 'LOADING_START' }); // Start loading
    //         (async () => {
    //             try {
    //                 const userResponse = await axios.get("/api/users/account", {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 });
    //                 dispatch({ type: "LOGIN_USER", payload: userResponse.data }); // Set user from response
    //             } catch (err) {
    //                 console.error(err);
    //                 dispatch({ type: 'LOGOUT_USER' }); // Handle logout on error
    //             } finally {
    //                 dispatch({ type: 'LOADING_END' }); // End loading
    //             }
    //         })();
    //     }
    // }, [dispatch]);
    
      
    
    const handleRegister = async (formData) => {
        dispatch({ type: 'LOADING_START' })
        try { 
            const response=await axios.post('/api/users/register', formData)
            dispatch({type:'REGISTER_SUCCESS',payload:response.data})
            toast('Successfully Registered', { autoClose: 2000 })
            console.log(response.data)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGE' });
            }, 3000)
            return true
            // navigate('/login')
           
            
        } catch (err) {
            if (err.response && err.response.data.errors) {
                dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
            }
            return false
        }finally {
            dispatch({ type: 'LOADING_END' }); // Set loading to false when done
        }

    }

const handleLogin=async (formData)=>{
    try{
        // const token = localStorage.getItem('token')
        const response=await axios.post('/api/users/login',formData)
        localStorage.setItem('token',response.data.token)
        
        dispatch({type:'LOGIN_USER',payload: response.data.user})
        toast('Successfully LoggedIn')
        dispatch({ type: 'CLEAR_MESSAGE' })
        console.log(response.data)
        navigate('/')
       
        // const userResponse=await axios.get('/api/users/account',{headers:{'Authorization':token}})
        // dispatch({type:'LOGIN_USER',payload:userResponse.data})
        // navigate('/welcome')
    }catch(err){
        console.log(err)
        if (err.response && err.response.data.errors) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
        } else {
            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
        }
    }
}

const handleLogout=()=>{
    localStorage.removeItem('token')
    dispatch({type:'LOGOUT_USER'})
    toast('Successfully loggedout')
    dispatch({ type: 'CLEAR_MESSAGE' })
    navigate('/login')
}

const forgotPassword = async (email) => {
    try {
      dispatch({ type: 'REQUEST_PASSWORD_RESET' });
      const response = await axios.post('/api/forgot-password', { email });
      dispatch({ type: 'FETCH_PATIENTS_SUCCESS', payload: response.data.message });
      dispatch({ type: 'CLEAR_MESSAGE' })
    } catch (err) {
      dispatch({ type: 'PASSWORD_RESET_FAILURE', payload: err.response?.data?.error || 'Error resetting password' });
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      dispatch({ type: 'REQUEST_PASSWORD_RESET' });
      const response = await axios.post('/api/reset-password', { token, newPassword });
      dispatch({ type: 'PASSWORD_RESET_SUCCESS', payload: response.data.message });
      dispatch({ type: 'CLEAR_MESSAGE' })
    } catch (err) {
      dispatch({ type: 'PASSWORD_RESET_FAILURE', payload: err.response?.data?.error || 'Error resetting password' });
    }
  };

  const clearMessage = () => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  //Patients Record
  const addPatient=async(formData)=>{
    try{
        const token = localStorage.getItem('token')
        const response=await axios.post('/api/patients',formData,{headers:{'Authorization':`Bearer ${token}`}})
        console.log("Server Response:", response.data);
        dispatch({ type: 'ADD_PATIENT', payload: response.data })
        dispatch({ type: 'CLEAR_MESSAGE' })
        toast('Patient Record is Created')
        return response.data._id
    }catch (err) {
        console.error("Error creating patient:", err.message); // Log the error message
        if (err.response) {
            console.log("Error Response:", err.response.data); // Log the server error response
        }
        if (err.response && err.response.data.errors) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
        } else {
            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
        }
      }
  }

    const listPatients = useCallback(async () => {
    dispatch({ type: 'FETCH_PATIENTS_REQUEST' });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/patients', {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: 'FETCH_PATIENTS_SUCCESS', payload: response.data });
        dispatch({ type: 'CLEAR_MESSAGE' })
    } catch (error) {
        dispatch({ type: 'FETCH_PATIENTS_FAILURE', payload: error.message });
    }
    }, [dispatch]);

    const deletePatients=async(id)=>{
        try{
            const token = localStorage.getItem('token')
            await axios.delete(`/api/patients/${id}`,{
                headers: { Authorization: `Bearer ${token}` },
            })
            dispatch({type:'DELETE_PATIENT',payload:id})
            dispatch({ type: 'CLEAR_MESSAGE' })
            toast('Patient Record is deleted')
        }catch (err) {
            if (err.response && err.response.data.errors) {
                dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
            }
          }
    }

    // const setEditPatient=(patient)=>{
    //     // dispatch({type:'SET_EDIT_PATIENT',payload:patient})
    //     dispatch({ type: 'SET_EDIT_PATIENT', payload: patient });

    // }
    const setEditPatient = (patient) => {
        console.log("Setting Edit Patient:", patient)
        dispatch({ type: 'SET_EDIT_PATIENT', payload: patient }); // Store the full patient object
    }
    

    // const updatePatient=async(id,formData)=>{
    //     try{
    //         const token = localStorage.getItem('token')
    //         const response=await axios.put(`/api/patients/${id}`,formData,{
    //             headers:{Authorization:`Bearer ${token}`}
    //         })
    //         dispatch({type:'UPDATE_PATIENT',payload:response.data})
    //         dispatch({ type: 'CLEAR_MESSAGE' })
    //         toast('Patient Record is updated')
    //     }catch (err) {
    //         if (err.response && err.response.data.errors) {
    //             dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
    //         } else {
    //             dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
    //         }
    //       }
    // }

    const updatePatient = async (id, formData) => {
        console.log("Updating Patient ID:", id);  // Debugging ID
        console.log("Form Data to Update:", formData);  // Debugging Form Data
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`/api/patients/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Dispatch the updated patient data
            dispatch({ type: 'UPDATE_PATIENT', payload: response.data });
    
            // Clear any messages
            dispatch({ type: 'CLEAR_MESSAGE' });
    
            // Notify user of success
            toast('Patient Record is updated');
        } catch (err) {
            // Error handling
            if (err.response && err.response.data.errors) {
                dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
            }
            console.error("Error updating patient:", err);  // Log any error for debugging
        }
    };
    

    const addAppointment=async(formData)=>{
        try{
            const token = localStorage.getItem('token')
            const response=await axios.post('/api/appointments',formData,{headers:{'Authorization':`Bearer ${token}`}})
            console.log("Server Response:", response.data);
            dispatch({ type: 'ADD_APPOINTMENT', payload: response.data })
            dispatch({ type: 'CLEAR_MESSAGE' })
            toast('Appointment Record is Created')
            return response.data._id
            
        }catch (err) {
            console.error("Error creating appointment:", err.message); // Log the error message
            if (err.response) {
                console.log("Error Response:", err.response.data); // Log the server error response
            }
            if (err.response && err.response.data.errors) {
                dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
            }
          }
      }
    
        const listAppointments = useCallback(async () => {
        dispatch({ type: 'FETCH_APPOINTMENT_REQUEST' });
        try {
            const token = localStorage.getItem('token')
            console.log('Token:', token)
            const response = await axios.get('/api/appointments', {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log('Appointments response:', response.data)
            const updatedAppointmentsList = response.data.filter(appointment => appointment.status !== 'completed');
            dispatch({ type: 'FETCH_APPOINTMENT_SUCCESS', payload: updatedAppointmentsList });
            dispatch({ type: 'CLEAR_MESSAGE' })
        } catch (error) {
            
                const errorMessage = error.response ? error.response.data.error : error.message;
                console.error('Error fetching appointments:', errorMessage);
                dispatch({ type: 'FETCH_APPOINTMENT_FAILURE', payload: errorMessage });
                         }
        }, [dispatch]);
    
        const deleteAppointment=async(id)=>{
            try{
                const token = localStorage.getItem('token')
                await axios.delete(`/api/appointments/${id}`,{
                    headers: { Authorization: `Bearer ${token}` },
                })
                dispatch({type:'DELETE_APPOINTMENT',payload:id})
                dispatch({ type: 'CLEAR_MESSAGE' })
                toast('appointment Record is deleted')
            }catch (err) {
                if (err.response && err.response.data.errors) {
                    dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                } else {
                    dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                }
              }
        }
    
        const setEditAppointments=(formData)=>{
            dispatch({type:'SET_EDIT_APPOINTMENTS',payload:formData})
        }
    
        const updateAppointment=async(id,formData)=>{
            try{
                const token = localStorage.getItem('token')
                const response=await axios.put(`/api/appointments/${id}`,formData,{
                    headers:{Authorization:`Bearer ${token}`}
                })
                
                dispatch({type:'UPDATE_APPOINTMENTS',payload:response.data})
                dispatch({ type: 'CLEAR_MESSAGE' })
                toast('appointment Record is updated')
            }catch (err) {
                if (err.response && err.response.data.errors) {
                    dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                } else {
                    dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                }
              }
        }

        const addMedicalRecord=async(formData)=>{
            try{
                const token = localStorage.getItem('token')
                const response=await axios.post('/api/patientMedicalRecord',formData,{headers:{'Authorization':`Bearer ${token}`}})
                console.log("Server Response:", response.data);
                dispatch({ type: 'ADD_MEDICAL_RECORD', payload: response.data })
                toast('Medical Record is Created')
                return response.data._id
                
            }catch (err) {
                console.error("Error creating medical recordt:", err.message); // Log the error message
                if (err.response) {
                    console.log("Error Response:", err.response.data); // Log the server error response
                }
                if (err.response && err.response.data.errors) {
                    const errorMessages = err.response.data.errors.map((error) => ({ msg: error.msg || error }));
               
                    dispatch({ type: 'AUTH_ERROR', payload: errorMessages });
                } else {
                    dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                }
              }
          }
        
            const listMedicalRecords = useCallback(async () => {
            dispatch({ type: 'FETCH_MEDICAL_RECORDS_REQUEST' });
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/patientMedicalRecord/all', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const medicalRecordsWithOwnerNames = await Promise.all(
                    response.data.map(async (record) => {
                        console.log("Fetching patient details for ID:", record.patientId); // Log patient ID

                        const patientResponse = await axios.get(`/api/patients/${record.patientId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        return {
                            ...record,
                            ownerName: patientResponse.data.ownerName, // Assuming 'name' is the owner's name in the patient response
                        };
                    })
                )
                dispatch({ type: 'FETCH_MEDICAL_RECORDS_SUCCESS', payload: medicalRecordsWithOwnerNames })
                // dispatch({ type: 'FETCH_MEDICAL_RECORDS_SUCCESS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'FETCH_MEDICAL_RECORDS_FAILURE', payload: error.message });
            }
            }, [dispatch]);
        
            const deleteMedicalRecord=async(id)=>{
                try{
                    const token = localStorage.getItem('token')
                    await axios.delete(`/api/patientMedicalRecord/${id}`,{
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    dispatch({type:'DELETE_MEDICAL_RECORD',payload:id})
                    toast('medical Record is deleted')
                }catch (err) {
                    if (err.response && err.response.data.errors) {
                        dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                    } else {
                        dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                    }
                  }
            }
        
            const setEditMedicalRecords=(formData)=>{
                dispatch({type:'SET_EDIT_MEDICAL_RECORD',payload:formData})
            }
        
            const updateMedicalRecord=async(id,formData)=>{
                try{
                    const token = localStorage.getItem('token')
                    const response=await axios.put(`/api/patientMedicalRecord/${id}`,formData,{
                        headers:{Authorization:`Bearer ${token}`}
                    })
                    dispatch({type:'UPDATE_MEDICAL_RECORDS',payload:response.data})
                    toast('Medical Record is updated')
                }catch (err) {
                    if (err.response && err.response.data.errors) {
                        dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                    } else {
                        dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                    }
                  }
            }

            // const searchPatients = async (query) => {
            //     dispatch({ type: 'SEARCH_PATIENT_REQUEST' });
            //     try {
            //         const token = localStorage.getItem('token');
            //         const response = await axios.get(`/api/searchPatients`, {
            //             headers: { Authorization: `Bearer ${token}` },
            //             params: query,
            //         });
            //         dispatch({ type: 'SEARCH_PATIENT_SUCCESS', payload: response.data });
            //     } catch (error) {
            //         dispatch({ type: 'SEARCH_PATIENT_FAILURE', payload: error.message });
            //     }
            // }

            // const createBill=async(formData)=>{
            //     try{
            //         const token = localStorage.getItem('token')
            //         const response=await axios.post('/api/generatebill',formData,{headers:{'Authorization':`Bearer ${token}`}})
            //         console.log("Server Response:", response.data);
            //         // dispatch({ type: 'CREATE_BILL', payload: response.data })
            //         toast('Bill is Created')
            //         return response.data
            //         // return response.data._id
            //     }catch (err) {
            //         console.error("Error creating bill:", err.message); // Log the error message
            //         if (err.response) {
            //             console.log("Error Response:", err.response.data); // Log the server error response
            //         }
            //         if (err.response && err.response.data.errors) {
            //             dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
            //         } else {
            //             dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
            //         }
            //       }
            //   }
            const createBill = async (formData) => {
                try {
                    const token = localStorage.getItem('token');
                    if (formData.billingDate) {
                        const [day, month, year] = formData.billingDate.split('/');
                        formData.billingDate = `${year}-${month}-${day}`; // Convert to yyyy-MM-dd
                    }
                    console.log("Formatted Form Data Before Sending:", formData);
                    const response = await axios.post('/api/generatebill', formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    
                    console.log("Server Response:", response.data);
                    dispatch({ type: 'CREATE_BILL', payload: response.data }); // Dispatch the created bill
                    return response.data; // Return the response data
                } catch (err) {
                    console.error("Error creating bill:", err);

        // Improved error handling
        let errorMessage = 'Error creating bill.';
        if (err.response) {
            console.log("Error Response:", err.response.data);
            errorMessage = err.response.data.message || err.response.data.errors?.[0]?.msg || errorMessage;

            // Dispatching any error response from server
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors || [{ msg: errorMessage }] });
        } else {
            // Handle network errors or unexpected errors
            console.error("Error Details:", err);
            errorMessage = err.message || errorMessage;
            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: errorMessage }] });
        }

        toast.error(errorMessage); // Show error toast
    }
}
            // const fetchBills =(async () => {
               
            //     try {
            //         const token = localStorage.getItem('token');
            //         const response = await axios.get('/api/generatebill', {
            //             headers: { Authorization: `Bearer ${token}` },
            //         });
            //         dispatch({ type: 'FETCH_BILLS', payload: response.data });
            //         dispatch({ type: 'CLEAR_MESSAGE' })
            //     } catch (error) {
            //         console.error('Error fetching bills', error)
                    
            //     }
            //     }, []);

            

                            
                const deleteBill=async(id)=>{
                    try{
                        const token = localStorage.getItem('token')
                        await axios.delete(`/api/generatebill/${id}`,{
                            headers: { Authorization: `Bearer ${token}` },
                        })
                        dispatch({type:'DELETE_BILL',payload:id})
                        toast('bill record is deleted')
                    }catch (err) {
                        if (err.response && err.response.data.errors) {
                            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                        } else {
                            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                        }
                      }
                }
            
                const setEditBill=(id)=>{
                    dispatch({type:'SET_EDIT_BILL',payload:id})
                }
            
                const updateBill=async(id,formData)=>{
                    try{
                        const token = localStorage.getItem('token')
                        const response=await axios.put(`/api/generatebill/${id}`,formData,{
                            headers:{Authorization:`Bearer ${token}`}
                        })
                        // dispatch({type:'UPDATE_BILL',payload:response.data})
                        // toast('Bill Record is updated')
                        // console.log(response.data)
                        // return response.data;
                        if (response && response.data) {
                            dispatch({ type: 'UPDATE_BILL', payload: response.data });
                            toast('Bill Record is updated');
                            console.log(response.data);
                            return response.data;
                        } else {
                            throw new Error('Unexpected response structure');
                        }
                        
                    }catch (err) {
                        if (err.response && err.response.data.errors) {
                            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                        } else {
                            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                        }
                      }
                }

                // const fetchSingleBill = async (id) => {
                //     try {
                //         const token = localStorage.getItem('token');
                //         const response = await axios.get('/api/generatebill/${id}', {
                //             headers: { Authorization: `Bearer ${token}` },
                //         });
                       
                //         dispatch({ type: 'FETCH_SINGLE_BILL', payload: response.data });
                //         return response.data
                //     } catch (error) {
                //         console.error('Error fetching single bill', error)
                //         // dispatch({ type: 'FETCH_APPOINTMENT_FAILURE', payload: error.message });
                //     }
                // }

                const ListBill = async (id) => {
                    try {
                        const token = localStorage.getItem('token');
                        const response = await axios.get('/api/generatebill', {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        dispatch({ type: 'FETCH_BILLS', payload: response.data });
                    } catch (error) {
                        console.error('Error fetching single bill', error)
                        // dispatch({ type: 'FETCH_APPOINTMENT_FAILURE', payload: error.message });
                    }
                }

                const searchPatient = async ({ patientId, medicalId, ownerContact }) => {
                    
                    try {
                        const token = localStorage.getItem('token')
                        const response = await axios.get('/api/searchPatients',{
                            headers:{Authorization:`Bearer ${token}`}, 
                            params: { patientId, medicalId, ownerContact },
                        });
                        dispatch({
                            type: 'SEARCH_PATIENT',
                            payload: {
                                patient: response.data,
                                medicalHistory: response.data.medicalHistory || [],
                            },
                        });
                    } catch (err) {
                        if (err.response && err.response.data.errors) {
                            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.errors });
                        } else {
                            dispatch({ type: 'AUTH_ERROR', payload: [{ msg: 'An unknown error occurred. Please try again.' }] });
                        }
                      }
                }


return(
    <AuthContext.Provider value={{...state,state,dispatch,handleLogin,handleLogout,handleRegister,
                        forgotPassword,resetPassword,clearMessage,addPatient,listPatients,deletePatients,
                        setEditPatient,updatePatient,addAppointment,deleteAppointment,listAppointments,updateAppointment,
                        setEditAppointments,listMedicalRecords,addMedicalRecord,updateMedicalRecord,deleteMedicalRecord,
                        setEditMedicalRecords,ListBill, createBill, updateBill, deleteBill,setEditBill,searchPatient}}>
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthProvider
