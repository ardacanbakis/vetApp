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
    appointmentId: "",
  });

  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
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

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAppointmentSelectChange = (e) => {
    const value = e.target.value;
    setNewReport((prev) => ({
      ...prev,
      appointmentId: value,
    }));
  };

  const handleNewReportBtn = () => {
    createReport(newReport)
      .then(() => {
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
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

  const handleUpdateReportInputs = (e) => {
    const { name, value } = e.target;
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAppointmentSelectChange = (e) => {
    const value = e.target.value;
    setUpdateReport((prev) => ({
      ...prev,
      appointmentId: value,
    }));
  };

  const handleUpdateReportBtn = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
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
      appointmentId: report.appointment.id,
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
          onChange={handleNewReportInputChange}
        />
        <input
          type="text"
          placeholder="Diagnosis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReportInputChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newReport.price}
          onChange={handleNewReportInputChange}
        />
        <select
          value={newReport.appointmentId}
          name="appointmentId"
          onChange={handleNewAppointmentSelectChange}
        >
          <option value="" disabled>
            Select Appointment
          </option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.appointmentDate}
            </option>
          ))}
        </select>
        <button onClick={handleNewReportBtn}>Add</button>
        {alert === 1 && (
          <Alert severity="error">
            Please review your information and try again!
          </Alert>
        )}
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
        <select
          name="appointmentId"
          value={updateReport.appointmentId}
          onChange={handleUpdateAppointmentSelectChange}
        >
          <option value="" disabled>
            Select Appointment
          </option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.appointmentDate}
            </option>
          ))}
        </select>
        <button onClick={handleUpdateReportBtn}>Update</button>
        {alert === 2 && <Alert severity="error">Please select a report</Alert>}
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
                <th>Price</th>
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
                  <td>{report.price}</td>
                  <td className="actions">
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => handleDelete(report.id)}
                    />
                    <UpdateIcon
                      className="update-btn"
                      onClick={() => handleUpdateIcon(report)}
                    />
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
