import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  
      const { handleRegister, state } = useContext(AuthContext);
      const [Name, SetUserName] = useState('');
      const [Email, SetEmail] = useState('');
      const [Password, SetPassword] = useState('');
      const [Role, SetRole] = useState('customer');
      const [registerClientErrors, setRegisterClientError] = useState({});
      const navigate = useNavigate();
      const clientErrors = {};
  
      const runClientSideValidations = () => {
          if (Name.trim().length === 0) {
              clientErrors.username = "User name cannot be empty";
          }
          if (Email.trim().length === 0) {
              clientErrors.email = "Email cannot be empty";
          }
          if (Password.trim().length === 0) {
              clientErrors.password = "Password cannot be empty";
          }
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted"); // Debugging log
        setRegisterClientError({});
        runClientSideValidations();
    
        if (Object.keys(clientErrors).length === 0) {
            const formData = { Name, Email, Password, Role };
            console.log("Form Data before Registration: ", formData); // Debugging log
    
            const registrationSuccessful = await handleRegister(formData);
    
            if (registrationSuccessful) {
                // Reset fields after successful registration
                console.log("Before clearing: ", { Name, Email, Password, Role  }); // Debugging log
                SetUserName('')
                SetEmail('')
                SetPassword('')
                SetRole('customer') // Reset role to default
                console.log("After clearing: ", { Name: '', Email: '', Password: '', Role: 'customer' }); // Debugging log
                navigate('/login'); 
            }
        } else {
            setRegisterClientError(clientErrors);
        }
    };
    return (
          <div className="container d-flex justify-content-center align-items-center  ">
              <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                  <h2 className="text-center mb-4">Create New Account</h2>
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
  
                  <div className="form-group mb-3">
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Enter owner name"
                          value={Name}
                          onChange={(e) => {
                              console.log("Name input value: ", e.target.value); // Debugging log
                              SetUserName(e.target.value);
                          }} 
                      />
                      {registerClientErrors.username && <p className='text-danger'>{registerClientErrors.username}</p>}<br/>
                  </div>
  
                  <div className="form-group mb-3">
                      <input
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                          value={Email}
                          onChange={(e) => {
                              console.log("Email input value: ", e.target.value); // Debugging log
                              SetEmail(e.target.value);
                          }} 
                      />
                      {registerClientErrors.email && <p className='text-danger'>{registerClientErrors.email}</p>}
                  </div>
  
                  <div className="form-group mb-3">
                      <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={Password}
                          onChange={(e) => {
                              console.log("Password input value: ", e.target.value); // Debugging log
                              SetPassword(e.target.value);
                          }} 
                      />
                      {registerClientErrors.password && <p className='text-danger'>{registerClientErrors.password}</p>}<br/>       
                  </div>
  
                  <div className="form-group mb-3">
                      <select value={Role} onChange={(e) => SetRole(e.target.value)} className="form-control">
                          <option value="customer">Customer</option>
                          <option value="employee">Employee</option>
                          <option value="admin">Admin</option>
                      </select>
                  </div>
  
                  <button onClick={handleSubmit} className="btn btn-success btn-block mb-3">
                      Create Account
                  </button>
  
                  <div className="text-center">
                      <a href="/login" className="btn btn-primary">Log in</a>
                  </div>
              </div>
          </div>
      );
  }
  


// import {useState,useContext,useEffect} from 'react'
// import AuthContext from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// export default function Register(){
//     const {handleRegister,state}=useContext(AuthContext)
//     const [name,setUserName]=useState('')
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const [role,setRole]=useState('customer')
//     const [registerclientErrors,setRegisterClientError]=useState({})
//     const clientErrors={}
//     const navigate=useNavigate()

//     const runClientSideValidations=()=>{
//         if(name.trim().length===0){
//             clientErrors.username="user name cannot be empty"
//         }
//         if(email.trim().length===0){
//             clientErrors.email="email cannot be empty"
//         }
//         if(password.trim().length===0){
//             clientErrors.password="password cannot be empty"
//         }
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submitted")
//         setRegisterClientError({}); 
//         runClientSideValidations();
    
//         if (Object.keys(clientErrors).length === 0) {
//           const formData = { name, email, password, role }
//           console.log("Form Data: ", formData)
//           const registrationSuccessful = await handleRegister(formData); // Await registration
//           if (registrationSuccessful) {
//             // Clear form fields after successful registration
//             console.log("Before clearing: ", { name, email, password, role });

//             setUserName(''); // Clear username
//             setEmail(''); // Clear email
//             setPassword(''); // Clear password
//             setRole('customer'); // Reset role to default
//             setRegisterClientError({}); // Clear client-side errors
//             console.log("After clearing: ", { name, email, password, role }); // Debugging log
   
//             navigate('/login'); // Navigate to login page
//         }
//     } else {
//         setRegisterClientError(clientErrors);
//     }
//     }
//     useEffect(() => {
//       console.log("Current values: ", { name, email, password, role }); // Log to observe state changes
//   }, [name, email, password, role]);

//     return (
//         <div className="container d-flex justify-content-center align-items-center min-vh-100">
//           <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
//             <h2 className="text-center mb-4">Create New Account</h2>
            
//             {state.error && (
//               <div className="alert alert-danger">
//               <h3>Server Error</h3>
//               <ul>
//                   {state.error.map((ele, i) => (
//                       <li key={i}>{ele.msg}</li>
//                   ))}
//               </ul>
//           </div>

//             )}
//             <div className="form-group mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="enter owner name"
//                 value={name}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//                {registerclientErrors.username && <p className='text-danger'>{registerclientErrors.username}</p>}<br/>
//             </div>

//             <div className="form-group mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {registerclientErrors.email && <p className='text-danger'>{registerclientErrors.email}</p>}
//               </div>

//             <div className="form-group mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {registerclientErrors.password && <p className='text-danger'>{registerclientErrors.password}</p>}<br/>       
//             </div>
           
//             <div className="form-group mb-3">
//                     <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
//                         <option value="customer">Customer</option>
//                         <option value="employee">Employee</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 </div>
                        
//             <button onClick={handleSubmit} className="btn btn-success btn-block mb-3">
//               Create Account
//             </button>

//             <div className="text-center">
//               <a href="/login" className="btn btn-primary">Log in</a>
//             </div>
//           </div>
//         </div>
//       );
// }
    



// import { useState, useContext } from 'react' 
// import AuthContext from '../context/AuthContext'

// export default function Register(){
//     const { handleRegister} = useContext(AuthContext)
//     const [name,setName]=useState('')
//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [registerServerErrors, setRegisterServerErrors] = useState([])
//     const [registerClientErrors,setRegisterClientErrors] = useState({})
//     const registerErrors ={}

//     const runRegisterClientValidation =()=>{
//         if(name.trim().length === 0){
//             registerErrors.name = 'name cannot be empty'
//         }
//         if(email.trim().length === 0){
//             registerErrors.email = 'email cannot be empty'
//         }
//         if(password.trim().length === 0){
//           registerErrors.password = 'password cannot be empty'
//         }
        
//     }

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         const formData = {
//             name:name,
//             email: email,
//             password: password 
//         }
//         runRegisterClientValidation() 
//         if(Object.keys(registerErrors).length === 0){
//             try{
//                 await handleRegister(formData)
//                 setName('')
//                 setEmail('')
//                 setPassword('')
//                 setRegisterClientErrors({})
//                 setRegisterServerErrors([])
//             }catch(err){
//                 console.log(err)
//                 setRegisterServerErrors(err.response.data.errors)
//             }       
//         } else {
//             setRegisterClientErrors(registerErrors)
//         }
        
//     }
        
//     return (
//         <div>
//             <h2>Register Page</h2>
//             {registerServerErrors.length>0 && (
//                 <div>
//                     <h2>Server Errors</h2>
//                     <ul>
//                         {registerServerErrors.map((ele,i)=>{
//                             return(
//                                 <li key={i}>{ele}</li>
//                             )
//                         })}
//                     </ul>
//                 </div>
//                 )}
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='name'>Enter Name</label><br/>
//                 <input 
//                     id="name"
//                     type="text" 
//                     placeholder='Enter name' 
//                     value={name} 
//                     onChange={(e) => {setName(e.target.value)}} 
//                 /><br/>
//                 {registerClientErrors.name && <b className='text-danger'>{registerClientErrors.name}</b>} 
//                 <br />
//                 <label htmlFor='email'>Enter email</label><br/>
//                 <input 
//                     id="email"
//                     type="email" 
//                     placeholder='Enter email' 
//                     value={email} 
//                     onChange={e => setEmail(e.target.value)} 
//                 />{registerClientErrors.email && <p className='text-danger'>{registerClientErrors.email}</p>}  <br />
//                 <label htmlFor='password'>Enter Password</label>
//                 <input 
//                     id="password"
//                     type="password" 
//                     placeholder='Enter password' 
//                     value={password} 
//                     onChange={e => setPassword(e.target.value)} 
//                 /> {registerClientErrors.password && <p className='text-danger'>{registerClientErrors.password}</p>} <br /> 
//                 <input type="submit"  name="Register"/>
//             </form>
//         </div>
//     )
// }