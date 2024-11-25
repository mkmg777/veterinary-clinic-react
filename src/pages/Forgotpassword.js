import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, loading, error, message, clearMessage } = useContext(AuthContext);
  const [loginclientErrors,setLogInClientError]=useState({})
  // const [loginServerError,setLoginServerError]=useState([])
  const clientErrors={}

  const runClientSideValidations=()=>{
    if(email.trim().length===0){
        clientErrors.email="email cannot be empty "
        }
    }

  const handleSubmit = async(e) => {
    e.preventDefault();
    clearMessage()
    runClientSideValidations()
    if(Object.keys(clientErrors).length===0){
        try{
            await forgotPassword(email)
            setEmail('')
            // setLoginServerError([])
            setLogInClientError({})

        }catch(err){
            if (err.response) {
                console.log('Server Error:', err.response.data);
                // setLoginServerError(err.response.data.errors || [err.response.data]);
            } else if (err.request) {
                console.log('Request error:', err.request);
            } else {
                console.log('Error:', err.message);
            }
        }
    }
    else{
        setLogInClientError(clientErrors)
    }
}
    
  

  return (
    <div className=" container d-flex justify-content-center align-items-center ">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
            {/* {loginServerError.length>0 && (
                <div>
                    <h3>Server Error</h3>
                    <ul>{loginServerError.map((ele,i)=>{
                        return <li key={i}>{ele.msg}</li>
                    })}</ul>
                </div>
            )} */}
      <form onSubmit={handleSubmit} className='form-group mb-3'>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
           
          /> {loginclientErrors.email && <p className='text-danger'>{loginclientErrors.email}</p>}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit" disabled={loading}>
          Send Reset Link
        </button>
      </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


// import React, { useState, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import AuthContext from '../context/AuthContext'

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('')
//   const { token } = useParams();
//   const { resetPassword, loading, error, message, clearMessage,state } = useContext(AuthContext)
//   const [loginclientErrors,setLogInClientError]=useState({})
//   const clientErrors={}

//   const runClientSideValidations=()=>{
//     if(newPassword.trim().length===0){
//         clientErrors.password="password cannot be empty"
//     }
// }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     clearMessage()
//     runClientSideValidations()
//     if(Object.keys(clientErrors).length===0){
//       console.log('New Password:', newPassword); // Check if newPassword is passed correctly
//       resetPassword(token, newPassword);
//       setLogInClientError({})
//      }
//   else{
//       setLogInClientError(clientErrors)
//   }
// }
    
  

//   return (
//     <div className=" container d-flex justify-content-center align-items-center min-vh-100 reset-password-container">
//     <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px'}}>
//     <h2 className="text-center mb-4">Reset Password</h2>
//     {state.error && (
//       <div className="alert alert-danger">
//       <h3>Server Error</h3>
//       <ul>
//         {state.error.map((ele, i) => (
//           <li key={i}>{ele.msg}</li>
//           ))}
//        </ul>
//       </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div  className="form-group mb-3">
//           <label className='text-primary'>Enter New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           {loginclientErrors.newPassword && <p className='text-danger'>{loginclientErrors.newPassword}</p>}
           
//         </div>
//         {loading && <p>Loading...</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {message && <p style={{ color: 'green' }}>{message}</p>}
//         <button type="submit" disabled={loading} className="btn btn-secondary btn-block mb-3">
//           Reset Password
//         </button>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default ResetPassword;

