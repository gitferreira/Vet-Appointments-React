import React, { Fragment, useState } from "react";
import PropTypes from "prop-types"
const { v4: uuid } = require("uuid");


const Form = ({ createAppointment }) => {
  //Create State of Appointments
  const [appointment, setAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    time: "",
    symptoms: "",
  });

  //Create State Error
  const [error, setError] = useState(false);

  //Handle Changes
  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  //Extract Values
  //Para no escribir appointment.pet, appointment.name...
  const { pet, owner, date, time, symptoms } = appointment;

  //Submitting form
  const submitAppointment = (e) => {
    e.preventDefault();

    //Validate
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Remove Previous Error Message
    setError(false);

    //Assign ID
    appointment.id = uuid();
    console.log(appointment);

    //Create Appointment
    createAppointment(appointment);

    //Form Reset

    setAppointment({
      pet: "",
      owner: "",
      date: "",
      time: "",
      symptoms: "",
    });
  };

  return (
    <Fragment>
      <h2>Add Appointments</h2>
      {error ? (
        <p className="alerta-error"> You must fill all fields </p>
      ) : null}
      <form onSubmit={submitAppointment}>
        <label>Pet Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="pet name"
          onChange={handleChange}
          value={pet}
        />
        <label>Owner Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="owner name"
          onChange={handleChange}
          value={owner}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={handleChange}
          value={date}
        />
        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={handleChange}
          value={time}
        />
        <label>Symptoms</label>
        <textarea
          name="symptoms"
          className="u-full-width"
          onChange={handleChange}
          value={symptoms}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

Form.propTypes = {
    createAppointment: PropTypes.func.isRequired
}
export default Form;
