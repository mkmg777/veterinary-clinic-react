import React, { useEffect, useState, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import default CSS for the calendar
import '../style/CalenderStyles.css';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../components/axios';

const localizer = momentLocalizer(moment); // Localizer for dates

export default function AppointmentCalendar() {
  const { state, listAppointments } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch appointments on component mount
  useEffect(() => {
    listAppointments();
  }, [listAppointments]);

  // Format appointments into calendar events
  useEffect(() => {
    if (state.appointments) {
      const formattedEvents = state.appointments.map((appointment) => ({
        title: appointment.ownerName,
        start: new Date(appointment.date),
        end: new Date(appointment.date),
        allDay: true,
        id: appointment._id,
        status: appointment.status, // Appointment status
      }));
      setEvents(formattedEvents);
    }
  }, [state.appointments]);

  // Navigate to appointment details on event select
  const handleSelectEvent = (event) => {
    const selectedAppointment = state.appointments.find(
      (appointment) => appointment._id === event.id
    );
    if (selectedAppointment) {
      navigate(`/appointment-details/${selectedAppointment._id}`, {
        state: { appointment: selectedAppointment},
      });
    }
  };

  // Define different styles for event statuses
  const eventStyleGetter = (event) => {
    let backgroundColor;
    if (event.status === 'scheduled') {
      backgroundColor = '#007bff'; // Blue for scheduled
    } else if (event.status === 'completed') {
      backgroundColor = '#28a745'; // Green for completed
    } else {
      backgroundColor = '#ffc107'; // Yellow for other statuses
    }

    const style = {
      backgroundColor,
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      display: 'block',
      padding: '5px',
    };
    return { style };
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header text-white bg-primary">
          <h2 className="text-center">Appointments Calendar</h2>
        </div>
        <div className="card-body">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, width: '100%' }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    </div>
  );
}
