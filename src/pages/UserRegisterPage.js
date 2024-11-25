import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { handleRegister, state } = useContext(AuthContext);
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('customer');
    const [registerClientErrors, setRegisterClientError] = useState({});
    const navigate = useNavigate();
    const clientErrors = {};

    const runClientSideValidations = () => {
        if (name.trim().length === 0) {
            clientErrors.username = "User name cannot be empty";
        }
        if (email.trim().length === 0) {
            clientErrors.email = "Email cannot be empty";
        }
        if (password.trim().length === 0) {
            clientErrors.password = "Password cannot be empty";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted"); // Debugging log
        setRegisterClientError({});
        runClientSideValidations();

        // Log validation errors
        console.log("Client Errors: ", clientErrors);

        if (Object.keys(clientErrors).length === 0) {
            const formData = { name, email, password };
            console.log("Form Data before Registration: ", formData);

            const registrationSuccessful = await handleRegister(formData);

            if (registrationSuccessful) {
                // Reset fields after successful registration
                console.log("Before clearing: ", { name, email, password }); // Debugging log
                setUserName(''); 
                setEmail(''); 
                setPassword(''); 
                // setRole('customer'); 
                setRegisterClientError({}); 
           
                console.log("After clearing: ", { name, email, password}); // Debugging log
                setTimeout(() => {
                    navigate('/login'); 
                }, 100) 
            }
        } else {
            setRegisterClientError(clientErrors);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center ">
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
                        value={name}
                        onChange={(e) => setUserName(e.target.value)} 
                        autoComplete="off"
                        onFocus={(e) => e.target.value = ''} // Clear on focus
                    />
                    {registerClientErrors.username && <p className='text-danger'>{registerClientErrors.username}</p>}<br/>
                </div>

                <div className="form-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        autoComplete="new-email"
                        onFocus={(e) => e.target.value = ''} // Clear on focus
                    />
                    {registerClientErrors.email && <p className='text-danger'>{registerClientErrors.email}</p>}
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
                    {registerClientErrors.password && <p className='text-danger'>{registerClientErrors.password}</p>}<br/>       
                </div>

                {/* <div className="form-group mb-3">
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                        <option value="customer">Customer</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div> */}

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