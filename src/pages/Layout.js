import React, { useContext } from 'react';
import { Navbar, Nav, Container , Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {
  const { state, handleLogout } = useContext(AuthContext);
  const isCustomer = state.user && state.user.role === 'customer';
  const isAdminOrEmployee = state.user && (state.user.role === 'admin' || state.user.role === 'employee');

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">Samrudhi Veterinary Clinic</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/employees" className="text-white">About Doctor</Nav.Link>

              {state.isLoggedIn ? (
                <>
                  {isAdminOrEmployee && (
                    <>
                      <Nav.Link as={Link} to="/bill-list" className="text-white">Bills List</Nav.Link>
                      <Nav.Link as={Link} to="/medical-record-list" className="text-white">Medical Records</Nav.Link>
                      <Nav.Link as={Link} to="/appointment-list" className="text-white">Appointment List</Nav.Link>
                      <Nav.Link as={Link} to="/patients-list" className="text-white">Patients List</Nav.Link>
                      <Nav.Link as={Link} to="/appointment-calender" className="text-white">Appointment Calendar</Nav.Link>
                      
                    </>
                  )}
                  {/* <Nav.Link as={Link} to="/search" className="text-white">Search</Nav.Link> */}
                  <Nav.Link as={Link} to="/appointment" className="text-white">Create Appointment</Nav.Link>
                  <Nav.Link as={Link} to="/patient-record" className="text-white">Create Patient Details</Nav.Link>
                  <Nav.Link as={Link} to="/" className="text-white" onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Render the page content below the navigation bar */}
      <main>{children}</main>
      <footer className="bg-dark text-white mt-5 py-3">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: info@samruddhiveterinaryclinic.com</p>
              <p>Phone: +1 (234) 567-890</p>
            </Col>
            
            <Col md={4}>
              <h5>More Information</h5>
              <ul className="list-unstyled">
                <li><Link to="/faq" className="text-white">FAQ</Link></li>
                <li><Link to="/termsOfService" className="text-white">Terms of Service</Link></li>
                <li><Link to="/privacypolicy" className="text-white">Privacy Policy</Link></li>
                </ul>
            </Col>
          </Row>
          <div className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Samrudhi Veterinary Clinic. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
