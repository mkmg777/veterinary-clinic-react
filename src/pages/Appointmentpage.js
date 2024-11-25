import React from "react";
import AppointmentForm from "./AppointmentForm"
import { FaCalendarAlt, FaPhone, FaPaw, FaInfoCircle, FaStar, FaHeart } from "react-icons/fa";

export default function Appointmentpage(){
    return (
        <div className="container mt-5">
            {/* Header Section */}
            <header className="text-center mb-4">
                <h1 className="display-4">Schedule an Appointment</h1>
                <p className="lead">Your pet's health is our priority!</p>
            </header>

            <div className="row">
                {/* Main Column: Appointment Form */}
                <div className="col-lg-8 col-md-12 mb-4">
                    <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-warning text-white">
                            <h2 className="mb-0">Book Your Appointment</h2>
                        </div>
                        <div className="card-body">
                            <AppointmentForm />
                        </div>
                    </div>
                </div>

                {/* Sidebar Column: Helpful Information and Services */}
                <div className="col-lg-4 col-md-12">
                    <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-primary text-white">
                            <h5>Helpful Information</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <FaCalendarAlt className="me-2" />
                                    <strong>Hours:</strong> Mon-Sat: 6 PM - 9 PM
                                </li>
                                <li className="mb-3">
                                    <FaPaw className="me-2" />
                                    <strong>Bring:</strong> Medical records and any previous treatment details.
                                </li>
                                <li className="mb-3">
                                    <FaPhone className="me-2" />
                                    <strong>Contact:</strong> For assistance, call <strong>(123) 456-7890</strong>
                                </li>
                                <li className="mb-3">
                                    <FaInfoCircle className="me-2" />
                                    <strong>Tip:</strong> Arrive 15 minutes early to complete paperwork.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Our Services Section */}
                    <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-danger text-white">
                            <h5>Our Services</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Comprehensive Wellness Exams
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Vaccinations & Preventive Care
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Dental Care & Hygiene
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Surgical Services
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Emergency Care
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Comprehensive animal nutrition services to ensure optimal health and well-being for your pets.
                                </li>
                                <li className="mb-2">
                                    <FaHeart className="me-2" />
                                    Professional grooming services offer stylish haircuts for pets, including bathing, brushing, nail trimming, and ear cleaning.
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Why Choose Us Section */}
                    <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-success text-white">
                            <h5>Why Choose Us?</h5>
                        </div>
                        <div className="card-body">
                            <p>
                                <FaStar className="me-2" />
                                We offer personalized care tailored to each pet's needs.
                            </p>
                            <p>
                                <FaHeart className="me-2" />
                                Our dedicated team is passionate about animal health and well-being.
                            </p>
                            <p>
                                <FaInfoCircle className="me-2" />
                                State-of-the-art facilities to ensure your pet receives the best care.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment Checklist Section */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-header text-center bg-secondary text-white">
                            <h5>Appointment Checklist</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <FaInfoCircle className="me-2" />
                                    Bring your pet’s medical history and any previous records.
                                </li>
                                <li className="mb-2">
                                    <FaInfoCircle className="me-2" />
                                    Make sure your pet is comfortable and has had a walk beforehand.
                                </li>
                                <li className="mb-2">
                                    <FaInfoCircle className="me-2" />
                                    Prepare questions about your pet’s health for our veterinarians.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}