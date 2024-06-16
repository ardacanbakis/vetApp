import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentByDateDoctor,
  getAppointmentByDateAnimal
} from "../../API/appointment";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";
import "./Appointment.css";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data.content);
      setSearchResults(data.content);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
    });
    getAnimals().then((data) => {
      setAnimals(data.content);
    });

    setReload(false);
  }, [reload]);

  const handleNewAppointment = (event) => {
    if (event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        doctor: { id: event.target.value },
      });
    } else if (event.target.name === "animal") {
      setNewAppointment({
        ...newAppointment,
        animal: { id: event.target.value },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAppointmentBtn = () => {
    createAppointment(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          doctor: { id: "" },
          animal: { id: "" },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateAppointmentInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAppointment({
        ...updateAppointment,
        doctor: { id: event.target.value },
      });
    } else if (event.target.name === "animal") {
      setUpdateAppointment({
        ...updateAppointment,
        animal: { id: event.target.value },
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAppointmentBtn = () => {
    updateAppointmentFunc(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentDate: "",
          doctor: { id: "" },
          animal: { id: "" },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctor: appointment.doctor,
      animal: appointment.animal,
      id: appointment.id,
    });
  };

  const handleSearchDoctorChange = (event) => {
    setDoctorId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleDoctorDateSearchBtn = () => {
    getAppointmentByDateDoctor(appointmentDate, doctorId).then((data) => {
      setAppointments(data.content);
    });
  };

  const handleSearchAnimalChange = (event) => {
    setAnimalId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleAnimalDateSearchBtn = () => {
    getAppointmentByDateAnimal(appointmentDate, animalId).then((data) => {
      setAppointments(data.content);
    });
  };

  const handleReset = () => {
    setSearch("");
    setDoctorId("");
    setAnimalId("");
    setAppointments(searchResults);
  };

  return (
    <div className="appointment">
      
      <div className="appointment-newappointment">
        <h3>New Appointment</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />
        <select
          value={newAppointment.doctor.id}
          name="doctor"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select Doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <select
          value={newAppointment.animal.id}
          name="animal"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Select Pet
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
        <button onClick={handleNewAppointmentBtn}>Add</button>
        {alert === 1 && (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        )}
      </div>

      <div className="appointment-updateappointment">
        <h3>Update Appointment</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleUpdateAppointmentInputs}
        />
        <select
          value={updateAppointment.doctor.id}
          name="doctor"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Appointment
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <select
          value={updateAppointment.animal.id}
          name="animal"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Pet
          </option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
        <button onClick={handleUpdateAppointmentBtn}>Update</button>
        {alert === 2 && (
          <Alert severity="error">Please select an appointment!</Alert>
        )}
      </div>

      <div className="appointment-search">
        <div className="appointment-search-doctor-and-date">
          <h3>Search Appointment by Doctor and Date</h3>
          <select
            value={doctorId}
            name="doctor"
            onChange={handleSearchDoctorChange}
          >
            <option value="" disabled={true} selected={true}>
              Select Doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            placeholder="start-date "
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <button onClick={handleDoctorDateSearchBtn}>Search</button>
        </div>
        <div className="appointment-search-animal-and-date">
          <h3>Search Appointment by Animal Name and Date</h3>
          <select
            value={animalId}
            name="animal"
            onChange={handleSearchAnimalChange}
          >
            <option value="" disabled={true} selected={true}>
              Select Pet
            </option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            placeholder="start-date "
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <button onClick={handleAnimalDateSearchBtn}>Search</button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="list">
      <h2>Appointment List</h2>
        <div className="table-container">
          <table className="table">
       
          <thead>
            <tr>
              <th>Pet</th>
              <th>Customer</th>
              <th>Customer Phone</th>
              <th>Appointment Date</th>
              <th>Doctor</th>
              <th>Doctor Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.animal.name}</td>
                <td>{appointment.animal.customer.name}</td>
                <td>{appointment.animal.customer.phone}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.doctor.phone}</td>
                <td>
                  <span onClick={() => handleUpdateIcon(appointment)}>
                    <UpdateIcon />
                  </span>
                  <span onClick={() => handleDelete(appointment.id)}>
                    <DeleteIcon />
                  </span>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Appointment;
