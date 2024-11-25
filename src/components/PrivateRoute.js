// import { Navigate } from "react-router-dom";
// export default function PrivateRoute(props){
//     if(localStorage.getItem('token')){
//         return props.children
//     }else{
//         return <Navigate to="/login"/>
//     }
// }

// import { Navigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { useContext } from "react";
// export default function PrivateRoute(props) {
//     const {state}=useContext(AuthContext)
//     const token = localStorage.getItem('token');
    
//     console.log("Token: ", token);

//     if (!token) {
//         // If no token, navigate to the login page
//         return <Navigate to="/login" />;
//     }
//     if(!state.user) {
//             return <Navigate to="/login" />
        
//     }
//     // If token exists, render the protected route (children)
//     return props.children;
// }
// if(true) {
//     return <Navigate to="/login" />
// }

import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { state } = useContext(AuthContext);

    if (!state.isLoggedIn) {
        // If user is not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    // If user is logged in, allow access to the page
    return children;
}

export default ProtectedRoute;
