import React, { useState, useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const { token } = useParams();
  const { resetPassword, loading, error, message, clearMessage,state } = useContext(AuthContext)
  const navigate=useNavigate()
  const [loginclientErrors,setLogInClientError]=useState({})
  const clientErrors={}

  const runClientSideValidations=()=>{
       if(newPassword.trim().length===0){
        clientErrors.newPassword="password cannot be empty and password should contain atleast 1 uppercase, 1 lowercase,1 special symbol and 1 number and it must contain minimum of 8 characters long"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   clearMessage()
  //  console.log('Token:', token); // Check if token is passed correctly
    // console.log('New Password:', newPassword); // Check if newPassword is passed correctly
    runClientSideValidations()
    if(Object.keys(clientErrors).length===0){
      setLogInClientError({})
      resetPassword(token, newPassword)
      setNewPassword('')
      setLogInClientError({})
      }
      else{
        setLogInClientError(clientErrors)
      }
  }
  const handleNavigate=()=>{
    if(state.isLoggedIn){
        navigate('/login')
    }else{
        navigate('/login')
    }
    
}

  return (
    <div className=" container d-flex justify-content-center align-items-center min-vh-100 reset-password-container">
    <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Reset Password</h2>
    {/* {state.error && (
      <div className="alert alert-danger">
      <h3>Server Error</h3>
      <ul>
        {state.error.map((ele, i) => (
          <li key={i}>{ele.msg}</li>
          ))}
       </ul>
      </div>
      )} */}
      <form onSubmit={handleSubmit}>
        <div  className="form-group mb-3">
          <label className='text-primary'>Enter New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
           {loginclientErrors.password && <p className='text-danger'>{loginclientErrors.password}</p>}
         
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <div className='text-start mb-3'>
        <button type="submit" disabled={loading} className="btn btn-primary btn-block mb-3">
          Reset Password
        </button>
        </div>
        <div >
                <button
                className="btn btn-primary"
                type='button'
                onClick={handleNavigate}
                >
                Login
            </button>
            </div>
      </form>
    </div>
    </div>
  )
}

export default ResetPassword;
