import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDates, setAvailableDates] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);

  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data.content);
      setSearchResults(data.content);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAvailableDateBtn = () => {
    createAvailableDate(newAvailableDate)
      .then(() => {
        setReload(true);
        setNewAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
          },
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
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateAvailableDateInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAvailableDateBtn = () => {
    updateAvailableDateFunc(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
            name: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (availableDate) => {
    setUpdateAvailableDate({
      availableDate: availableDate,
      doctor: availableDate.doctor,
      id: availableDate.id,
    });
  };

  const handleInputSelect = (event) => {
    setSearch(event.target.value);
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSearch = () => {
    const filteredAvailableDate = searchResults.filter((availableDate) =>
      availableDate.availableDate.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableDates(filteredAvailableDate);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setAvailableDates(searchResults);
  };

  return (
    <>
      <h1>Available Date Management</h1>
      <div className="availabledate">
        <div className="availabledate-newawailabledate">
          <h3>Add New Date</h3>
          <select
            value={newAvailableDate.doctor.id}
            name="doctorId"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true} selected={true}>
              Select Doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>
          <input
            type="date"
            placeholder="Available Date"
            name="workDay"
            value={newAvailableDate.workDay}
            onChange={handleNewAvailableDate}
          />
          <button onClick={handleNewAvailableDateBtn}>Add</button>
          {alert === 1 ? (
            <Alert severity="error">
              Please review the information and try again!
            </Alert>
          ) : null}
        </div>

        <div className="availabledate-updateavailabledate">
          <h3>Update Date</h3>
         
            <input
              disabled
              style={{ marginBottom: "10px" }}
              value={`Doctor Name: ${updateAvailableDate.doctor.name || ""}`}
            ></input>
         
          <input
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={updateAvailableDate.availableDate.workDay}
            onChange={handleUpdateAvailableDateInputs}
          />
          <button onClick={handleUpdateAvailableDateBtn}>Update</button>
          {alert === 2 ? (
            <Alert severity="error">"Please select a valid date!"</Alert>
          ) : null}
        </div>

        <div className="availabledate-searchbydate">
          <h3 className="available-h3">Search by Date</h3>
          <select value={search} name="doctor" onChange={handleInputSelect}>
            <option value="" disabled={true} selected={true}>
              Select Doctor
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>
          <input
            type="date"
            placeholder="Enter date... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="list">
        <h2>Available Date List</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor Full Name</th>
                <th>Available Date</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableDates.map((availableDate) => (
                <tr key={availableDate.id}>
                  <td>{availableDate.doctor.name}</td>
                  <td>{availableDate.workDay}</td>
                  <td>{availableDate.doctor.phone}</td>
                  <td>{availableDate.doctor.email}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(availableDate)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(availableDate.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AvailableDate;
