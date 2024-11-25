// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Button } from 'react-bootstrap';

// export default function WelcomePage() {
//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col className="text-center">
//           <h1>Welcome to the Veterinary Clinic Management System</h1>
//           <Link to="/register">
//             <Button variant="primary" className="m-2">Register</Button>
//           </Link>
//           <Link to="/login">
//             <Button variant="secondary" className="m-2">Login</Button>
//           </Link>
//           <Link to="/appointment">
//             <Button variant="success" className="m-2">Appointment</Button>
//           </Link>
//           <Link to="/customer">
//             <Button variant="warning" className="m-2">Customer</Button>
//           </Link>
//           <Link to="/medical-records">
//             <Button variant="info" className="m-2">Medical Records</Button>
//           </Link>
//           <Link to="/employee-search">
//             <Button variant="dark" className="m-2">Employee Search</Button>
//           </Link>
//         </Col>
//       </Row>
//     </Container>
//   );
// };


// import React, { useContext,useEffect } from 'react';
// import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import backgroundImage from '../images/welcome.avif';
// import AuthContext from '../context/AuthContext';
// import axios from '../components/axios';

// export default function WelcomePage() {
//   const { state, handleLogout,dispatch } = useContext(AuthContext);
//   console.log('Current State:', state); // Log the state here

//   const backgroundImageStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh', // Adjust based on your preference
//     color: 'white', // Ensure text is readable on the background
//   };
//   useEffect(() => {
//     console.log('WelcomePage useEffect triggered');
//     console.log('Current user:', state.user);

//     if (!state.user && state.isLoggedIn) {
//         // Fetch the user info based on the token
//         const token = localStorage.getItem('token');
//         if (token) {
//             (async () => {
//                 try {
//                     const userResponse = await axios.get("/api/users/account", {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     console.log('Fetched user response:', userResponse.data);
                    
//                     if (userResponse.data) {
//                         dispatch({ type: "LOGIN_USER", payload: userResponse.data });
//                     } else {
//                         console.warn('User data not found in response');
//                         dispatch({ type: 'LOGOUT_USER' });
//                     }
//                     // dispatch({ type: "LOGIN_USER", payload: userResponse.data }); // Correctly set user
//                 } catch (error) {
//                     console.error(error);
//                     dispatch({ type: 'LOGOUT_USER' }); // Handle logout on error
//                 }
//             })();
//         }
//     }
// }, [state.user, state.isLoggedIn, dispatch]); // Ensure dependencies are correctly set

//   const isCustomer = state.user && state.user.role === 'customer';
//   const isAdminOrEmployee = state.user && (state.user.role === 'admin' || state.user.role === 'employee');

//   return (
   
//     <> 
      
//       {state.isLoggedIn ? (
//         <>
        
//           {/* Navigation Bar */}
//           <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
//             <Container>
//               <Navbar.Brand as={Link} to="/" className="fw-bold ">Samrudhi Veterinary Clinic </Navbar.Brand>
//               <Navbar.Toggle aria-controls="basic-navbar-nav" />
//               <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="ml-auto">
//                   {/* Only show this on large screens */}
//                   <Nav.Link as={Link} to="/employees" className="d-none d-lg-block text-white">About Doctor</Nav.Link>
//                   <Nav.Link as={Link} to="/employees" className="d-lg-none text-white">About Doctor</Nav.Link>

//                   {isAdminOrEmployee && (
//                     <>
//                       <Nav.Link as={Link} to="/bill-list" className='d-none d-lg-block text-white'>Bills</Nav.Link>
//                       <Nav.Link as={Link} to="/bill-list" className='d-lg-none text-white'>Bills</Nav.Link>

//                       <Nav.Link as={Link} to="/medical-record-list" className='d-none d-lg-block text-white'>Medical Records</Nav.Link>
//                       <Nav.Link as={Link} to="/medical-record-list" className='d-lg-none text-white'>Medical Records</Nav.Link>
                      
//                       <Nav.Link as={Link} to="/appointment-calender" className='d-none d-lg-block text-white'>Appointment calender</Nav.Link>
//                       <Nav.Link as={Link} to="/appointment-calender" className='d-lg-none text-white'>Appointment calender</Nav.Link>

//                       <Nav.Link as={Link} to="/appointment-list" className='d-none d-lg-block text-white'>Appointment List</Nav.Link>
//                       <Nav.Link as={Link} to="/appointment-list" className='d-lg-none text-white'>Appointment List</Nav.Link>

//                       <Nav.Link as={Link} to="/patients-list" className='d-none d-lg-block text-white'>Patients List </Nav.Link>
//                       <Nav.Link as={Link} to="/patients-list" className='d-lg-none text-white'>Patients List</Nav.Link>

//                       {/* <Nav.Link as={Link} to="/patient-record" className='d-none d-lg-block text-white'>Create Patient Details</Nav.Link>
//                       <Nav.Link as={Link} to="/patient-record" className='d-lg-none text-white'>Create Patient Details</Nav.Link> */}
//                     </>
//                   )}

//                   <Nav.Link as={Link} to="/search" className='d-none d-lg-block text-white'>Search</Nav.Link>
//                   <Nav.Link as={Link} to="/search" className='d-lg-none text-white'>Search</Nav.Link>

//                   <Nav.Link as={Link} to="/appointment" className='d-none d-lg-block text-white'>Create Appointment</Nav.Link>
//                   <Nav.Link as={Link} to="/appointment" className='d-lg-none text-white'>Create Appointment</Nav.Link>

                  
                  
//                       <Nav.Link as={Link} to="/patient-record" className='d-none d-lg-block text-white'>Create Patient Details</Nav.Link>
//                       <Nav.Link as={Link} to="/patient-record" className='d-lg-none text-white'>Create Patient Details</Nav.Link>
                    

                  

//                   <Nav.Link as={Link} to="/" className='d-none d-lg-block text-white' onClick={handleLogout}>Logout</Nav.Link>
//                   <Nav.Link as={Link} to="/" className='d-lg-none text-white' onClick={handleLogout}>Logout</Nav.Link>
//                 </Nav>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>
//         </>
//       ) : (
//         <>
//           <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
//             <Container>
//               <Navbar.Brand href="/" className="fw-bold ">Samrudhi Veterinary Clinic </Navbar.Brand>
//               <Navbar.Toggle aria-controls="basic-navbar-nav" />
//               <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="ml-auto">
//                   <Nav.Link as={Link} to="/employees" className="d-none d-lg-block text-white">About Doctor</Nav.Link>
//                   <Nav.Link as={Link} to="/employees" className="d-lg-none text-white">About Doctor</Nav.Link>

//                   <Nav.Link as={Link} to="/login" className='d-none d-lg-block text-white'>Login</Nav.Link>
//                   <Nav.Link as={Link} to="/login" className='d-lg-none text-white'>Login</Nav.Link>

//                   <Nav.Link as={Link} to="/register" className='d-none d-lg-block text-white'>Register</Nav.Link>
//                   <Nav.Link as={Link} to="/register" className='d-lg-none text-white'>Register</Nav.Link>
//                 </Nav>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>
//         </>
//       )}

//       {/* Welcome Section */}
//       <div style={backgroundImageStyle}>
//         <Container className="text-center d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//           <Row>
//             <Col xs={12} md={8} className="mx-auto text-black">
//               <br /><br /><br />
//               <h1>Welcome</h1>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// }


import React, { useContext } from 'react';
import { Navbar, Nav, Container,Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import backgroundImage from '../images/welcome.avif';


export default function Welcomepage ({ children })  {
  const { state, handleLogout } = useContext(AuthContext);
  const isCustomer = state.user && state.user.role === 'customer';
  const isAdminOrEmployee = state.user && (state.user.role === 'admin' || state.user.role === 'employee');

//   return (
//     <>
//       {/* Navigation Bar */}
//       <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
//         <Container>
//           <Navbar.Brand as={Link} to="/" className="fw-bold">Samrudhi Veterinary Clinic</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ml-auto">
//               <Nav.Link as={Link} to="/employees" className="text-white">About Doctor</Nav.Link>

//               {state.isLoggedIn ? (
//                 <>
//                   {isAdminOrEmployee && (
//                     <>
//                       <Nav.Link as={Link} to="/bill-list" className="text-white">Bills</Nav.Link>
//                       <Nav.Link as={Link} to="/medical-record-list" className="text-white">Medical Records</Nav.Link>
//                       <Nav.Link as={Link} to="/appointment-calender" className="text-white">Appointment Calendar</Nav.Link>
//                       <Nav.Link as={Link} to="/appointment-list" className="text-white">Appointment List</Nav.Link>
//                       <Nav.Link as={Link} to="/patients-list" className="text-white">Patients List</Nav.Link>
//                     </>
//                   )}
//                   <Nav.Link as={Link} to="/search" className="text-white">Search</Nav.Link>
//                   <Nav.Link as={Link} to="/appointment" className="text-white">Create Appointment</Nav.Link>
//                   <Nav.Link as={Link} to="/patient-record" className="text-white">Create Patient Details</Nav.Link>
//                   <Nav.Link as={Link} to="/" className="text-white" onClick={handleLogout}>Logout</Nav.Link>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
//                   <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Render the page content below the navigation bar */}
//       <main>{children}</main>
//     </>
//   );
// };

const backgroundImageStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Adjust based on your preference
      color: 'white', // Ensure text is readable on the background
    };

return (
  <div style={backgroundImageStyle}>
       <Container className="text-center d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
           <Row>
             <Col xs={12} md={8} className="mx-auto text-black">
               <br /><br /><br />
               <h1>Welcome</h1>
             </Col>
           </Row>
         </Container>
       </div>
)
}
