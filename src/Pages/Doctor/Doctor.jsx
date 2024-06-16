import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
  getDoctorByName,
} from "../../API/doctor";
import "./Doctor.css";

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [doctorSearch, setDoctorSearch] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data.content);
      setSearchResults(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewDoctorBtn = () => {
    createDoctor(newDoctor)
      .then(() => {
        setReload(true);
        setNewDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: "",
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
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (doctor) => {
    setUpdateDoctor({
      name: doctor.name,
      email: doctor.email,
      address: doctor.address,
      city: doctor.city,
      phone: doctor.phone,
      id: doctor.id,
    });
  };

  const handleSearchDoctorByName = () => {
    getDoctorByName(doctorSearch).then((data) => {
      setDoctors(data.content);
    });
  };

  const handleReset = () => {
    setDoctorSearch("");
    setDoctors(searchResults);
  };

  return (
    <>
      <div className="doctor">
          <h3>Add Doctor</h3>
        <div className="doctor-newdoctor">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newDoctor.email}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctor}
          />
          <button onClick={handleNewDoctorBtn}>Add</button>
          {alert === 1 ? (
            <Alert severity="error">
              Please review the information and try again!
            </Alert>
          ) : null}
        </div>

          <h3>Update Doctor</h3>
        <div className="doctor-updatedoctor">

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputs}
          />
          <button onClick={handleUpdateDoctorBtn}>Update</button>
          {alert === 2 ? (
            <Alert severity="error">Please select a doctor!</Alert>
          ) : null}
        </div>

        <div className="doctor-search">
          <h3>Search Doctor</h3>
          <input
            type="text"
            placeholder="Enter Doctor's Name"
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
          />
          <button onClick={handleSearchDoctorByName}>
            Search
          </button>
          <button className="reset-btn" onClick={handleReset}>
Reset          </button>
        </div>
        <div>
          <h2>Doctor List</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor Full Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.address}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <span onClick={() => handleUpdateIcon(doctor)}>
                        <UpdateIcon />
                      </span>
                      <span onClick={() => handleDelete(doctor.id)}>
                        <DeleteIcon />
                      </span>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Doctor;
