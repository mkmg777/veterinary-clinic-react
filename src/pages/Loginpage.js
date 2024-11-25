import { useState, useContext } from 'react' 
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const {handleLogin,state}=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginclientErrors,setLogInClientError]=useState({})
    const clientErrors={}

    const navigate=useNavigate()

    const runClientSideValidations=()=>{
        if(email.trim().length===0){
            clientErrors.email="email cannot be empty"
        }
        if(password.trim().length===0){
            clientErrors.password="password cannot be empty"
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
            email,
            password
        }
        runClientSideValidations()
        if(Object.keys(clientErrors).length===0){
          setLogInClientError({})
          await handleLogin(formData)
          setEmail('')
          setPassword('')
          setLogInClientError({})
        }
        else{
            setLogInClientError(clientErrors)
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-4">LogIn</h2>
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
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-email"
                onFocus={(e) => e.target.value = ''} // Clear on focus
              />{loginclientErrors.email && <p className='text-danger'>{loginclientErrors.email}</p>}
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                onFocus={(e) => e.target.value = ''} // Clear on focus
              />
              {loginclientErrors.password && <p className='text-danger'>{loginclientErrors.password}</p>}
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-block mb-3">
              Log in
            </button>
            <div className="text-center">
                <button
                className="btn btn-link"
                onClick={() => navigate('/forgot-password')} // Navigate to Forgot Password page
                 >
                Forgotten password?
                 </button>
            </div>
            <div className="text-center mt-3">
                <button
                className="btn btn-success"
                onClick={() => navigate('/register')} // Navigate to Register page
                >
                Create new account
            </button>
             </div>
          </div>
        </div>
      );
}



// import {Link} from 'react-router-dom'
// export default function Login(){
//     const { handleLogin} = useContext(AuthContext)
//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [loginServerErrors, setLogInServerErrors] = useState([])
//     const [loginClientErrors,setLogInClientErrors] = useState({})
//     const loginErrors ={}

//     const runLogInClientValidation =()=>{
        
//         if(email.trim().length === 0){
//             loginErrors.email = 'email cannot be empty'
//         }
//         if(password.trim().length === 0){
//           loginErrors.password = 'password cannot be empty'
//         }
        
//     }

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         const formData = {
//             email: email,
//             password: password 
//         }
//         runLogInClientValidation() 
//         if(Object.keys(loginErrors).length === 0){
//             try{
//                 await handleLogin(formData)
//                 setEmail('')
//                 setPassword('')
//                 setLogInClientErrors({})
//                 setLogInServerErrors([])
//             }catch(err){
//                 console.log(err)
//                 setLogInServerErrors(err.response.data.errors)
//             }       
//         } else {
//             setLogInClientErrors(loginErrors)
//         }
        
//     }
//     return (
//         <div>
//             <h2>Login Page</h2>
//             {loginServerErrors.length>0 && (
//                 <div>
//                     <h2>Server Errors</h2>
//                     <ul>
//                         {loginServerErrors.map((ele,i)=>{
//                             return(
//                                 <li key={i}>{ele}</li>
//                             )
//                         })}
//                     </ul>
//                 </div>
//                 )}
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='email'>Enter email</label><br/>
//                 <input 
//                     id="email"
//                     type="email" 
//                     placeholder='Enter email' 
//                     value={email} 
//                     onChange={e => setEmail(e.target.value)} 
//                 />{loginClientErrors.email && <p className='text-danger'>{loginClientErrors.email}</p>}  <br />
//                 <label htmlFor='password'>Enter Password</label>
//                 <input 
//                     id="password"
//                     type="password" 
//                     placeholder='Enter password' 
//                     value={password} 
//                     onChange={e => setPassword(e.target.value)} 
//                 /> {loginClientErrors.password && <p className='text-danger'>{loginClientErrors.password}</p>} <br /> 
//                 <input type="submit"  name="Login"/>
//             </form>
//         </div>
//     )
// }