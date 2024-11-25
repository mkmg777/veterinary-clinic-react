import React from 'react'
import PatientForm from "./PatientForm"
import { FaInfoCircle, FaPhone, FaEnvelope, FaDog, FaPaw  } from "react-icons/fa"

export default function PatientRecord(){
    return (
        <div className="container mt-5">
          
          <header className="text-center mb-4">
            <h1 className="display-4">Patient Record Management</h1>
            <p className="lead">Manage your pet's information effortlessly</p>
          </header>
    
          <div className="row">
            {/* Patient Form Column */}
            <div className="col-md-8 mx-auto">
              <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                <div className="card-header text-center bg-primary text-white">
                  <h2 className="mb-0">Patient Information</h2>
                </div>
                <div className="card-body">
                  <PatientForm />
                </div>
              </div>
            </div>           
                <div className="col-md-4 mx-auto">
                    <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-info text-white">
                            <h5>Important Information</h5>
                        </div>
                        <div className="card-body">
                            <p>
                                <FaInfoCircle className="me-2" />
                                Please ensure that all fields are filled out accurately to provide the best care for your pet.
                            </p>
                            <p>
                                <FaPhone className="me-2" />
                                If you have any medical records or previous treatment details, please bring them along during your visit.
                            </p>
                            <p>
                                <FaEnvelope className="me-2" />
                                For any queries, feel free to contact us at <strong>ghyogeesh@gmail.com</strong>.
                            </p>
                            <p>
                                <FaInfoCircle className="me-2" />
                                Arrive at least 15 minutes early to complete any necessary paperwork.
                            </p>
                            <p>
                                <FaInfoCircle className="me-2" />
                                If your pet has any allergies or special needs, please inform our staff in advance.
                            </p>
                           
                            <p>
                                <FaInfoCircle className="me-2" />
                                Keep your pet on a leash or in a carrier for their safety and the safety of others.
                            </p>
                        </div>
                    </div>
              {/* Pet Care Tips Section */}
              <div className="card shadow border-0 mt-4" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-warning text-white">
                            <h5><FaDog className="me-2" /> Pet Care Tips</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><FaPaw className="me-2" /> Regular vet check-ups help ensure your pet stays healthy.</li>
                                <li><FaPaw className="me-2" /> Keep your pet's vaccinations up to date.</li>
                                <li><FaPaw className="me-2" /> Provide a balanced diet and plenty of fresh water.</li>
                                <li><FaPaw className="me-2" /> Exercise your pet regularly for physical and mental health.</li>
                                <li><FaPaw className="me-2" /> Create a safe and comfortable environment for your pet at home.</li>
                            </ul>
                        </div>
                    </div>
            </div>
          </div>
        </div>
      );
    }