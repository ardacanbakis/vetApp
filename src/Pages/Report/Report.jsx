import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";

function Report() {
  const [reports, setReports] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  useEffect(() => {
    getReports().then((data) => {
      setReports(data.content);
      setSearchResults(data.content);
    });
    getAppointments().then((data) => {
      setAppointments(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewReportBtn = () => {
    createReport(newReport)
      .then(() => {
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
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
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateReportInputs = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateReportBtn = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
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

  const handleUpdateIcon = (report) => {
    setUpdateReport({
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: report.appointment,
      id: report.id,
    });
  };

  const handleSearch = () => {
    const filteredReport = searchResults.filter((report) =>
      report.title.toLowerCase().includes(search.toLowerCase())
    );
    setReports(filteredReport);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setReports(searchResults);
  };

  return (
    <div className="report">
        <h3>New Report</h3>
      <div className="report-newreport">

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newReport.title}
          onChange={handleNewReport}
        />
        <input
          type="text"
          placeholder="Diagnosis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReport}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newReport.price}
          onChange={handleNewReport}
        />

        <select
          value={newReport.appointment.id}
          name="appointment"
          onChange={handleNewReport}
        >
          <option value="" disabled={true} selected={true}>
            Select Appointment
          </option>
          {appointments.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewReportBtn}>Add</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review your information and try again!
          </Alert>
        ) : null}
      </div>

        <h3>Update Report</h3>
      <div className="report-updatereport">

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={updateReport.title}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="text"
          placeholder="Diagnosis"
          name="diagnosis"
          value={updateReport.diagnosis}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={updateReport.price}
          onChange={handleUpdateReportInputs}
        />

        <select name="appointment" onChange={handleUpdateReportInputs}>
          <option value="" disabled={true} selected={true}>
            Select Appointment
          </option>
          {appointments.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleUpdateReportBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select a report</Alert>
        ) : null}
      </div>

      <div className="report-searchreport">
        <h3>Search Report</h3>

        <input
          type="text"
          placeholder="Enter Report Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="list">
        <h2>Report List</h2>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Animal Name</th>
                <th>Diagnosis</th>
                <th>Doctor Name</th>
                <th>Customer</th>
                <th>Vaccine List</th>
                <th>Price</th>
                <th>Appointment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.appointment.animalName}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.appointment.doctorName}</td>
                  <td>{report.appointment.customerName}</td>
                  <td>
                    {report.vaccineList?.map((vaccineLists) => (
                      <span>{vaccineLists.name} , </span>
                    ))}
                  </td>
                  <td>{report.price}</td>
                  <td>{report.appointment.date}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(report)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(report.id)}>
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

export default Report;
