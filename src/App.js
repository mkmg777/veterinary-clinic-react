import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import WelcomePage from './pages/Welcomepage';
// import Register from './pages/Registerpage';
import Register from './pages/UserRegisterPage';
import Login from './pages/Loginpage';
import Appointment from './pages/Appointmentpage';
import Customer from './pages/Customerpage';
import MedicalRecords from './pages/MedicalRecord';
import PatientRecord from './pages/PatientRecord';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import PatientList from './pages/PatientsList';
import PrivateRoute from './components/PrivateRoute'
import PatientConfirmation from './pages/PatientConformation';
import AppointmentForm from './pages/AppointmentForm';
import AppointmentList from './pages/AppointmentList';
import MedicalRecordForm from './pages/MedicalRecordForm';
import MedicalRecordList from './pages/MedicalRecordList';
import SearchPatient from './pages/SearchPatient';
import BillingForm from './pages/BillingForm';
import BillSuccess from './pages/BillSuccess';
import BillList from './pages/Bill-list'
import Doctor from './pages/Doctor';
import AppointmentCalender from './pages/Appointment-Calender';
import AppointmentDetails from './pages/AppointmentDetails';
import Layout from './pages/Layout';
import FAQ from './pages/Faq'
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
 
    return (
      <div>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService/>} />
          {/* Private Routes */}
          <Route
            path="/patient-record"
            element={
              <PrivateRoute permittedroles={["customer", "admin", "employee"]}>
                <PatientRecord />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointment"
            element={
              <PrivateRoute permittedroles={["customer", "admin", "employee"]}>
                <Appointment />
              </PrivateRoute>
            }
          />
          <Route path="/customer" element={<Customer />} />
          <Route
            path="/patients-list"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <PatientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/medical-records"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <MedicalRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/billing-form/:id"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <BillingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bill-success/:id"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <BillSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/bill-list"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <BillList />
              </PrivateRoute>
            }
          />
          <Route
            path="/medical-record-form"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <MedicalRecordForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/medical-record-list"
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <MedicalRecordList />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchPatient />} />
          <Route path="/patient-confirmation" element={<PatientConfirmation />} />
          <Route
            path="/appointment-form"
            element={
              <PrivateRoute permittedroles={["customer", "admin", "employee"]}>
                <AppointmentForm />
              </PrivateRoute>
            }
          />

          {/* <Route
              path="/appointment-form/:id"
              element={
                  <PrivateRoute permittedroles={[ "admin", "employee"]}>
                      <AppointmentForm />
                  </PrivateRoute>
              }
          /> */}
          <Route path="/appointment-list" 
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <AppointmentList />
                </PrivateRoute>
            }/>

          <Route path="/appointment-calender" 
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <AppointmentCalender />
                </PrivateRoute>
            }/>

            <Route path="/appointment-details/:id" 
            element={
              <PrivateRoute permittedroles={["admin", "employee"]}>
                <AppointmentDetails />
                </PrivateRoute>
            }/>
          <Route path="/employees" element={<Doctor />} />
        </Routes>
        </Layout>
        
        <ToastContainer />
      </div>
    );
  }
  
