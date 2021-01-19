import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() {
  //Local Storage Management
  let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
  if (!initialAppointments) {
    initialAppointments = [];
  }

  //All Appointments Submited
  const [appointments, setAppointments] = useState(initialAppointments);

  //useEffect
  useEffect(() => {
    if (initialAppointments) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, [appointments, initialAppointments]);

  //Function to handle current appointments + recent appointment

  const createAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  //Function to delete appointments by ID
  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(newAppointments);
  };

  //Conditional Message
  const title =
    appointments.length === 0
      ? "No Appointments Yet"
      : "Manage Your Appointments";

  return (
    <Fragment>
      <h1>Appointments</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
