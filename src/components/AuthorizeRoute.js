import { Navigate } from "react-router-dom";
import {useContext} from 'react'
import AuthContext from "../context/AuthContext";

export default function AuthorizeRoute(props){
    const {state}=useContext(AuthContext)
    if(!state.user){
        return <p>Loading...</p>
    }

    if (Array.isArray(props.permittedRole) && props.permittedRole.includes(state.user.role)) {
        return props.children;
    } else {
        // Redirect to forbidden page if user role is not permitted
        return <Navigate to="/forbidden" />;
    }
}