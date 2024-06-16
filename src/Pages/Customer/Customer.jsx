import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomerByName,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data.content);
      setSearchResults(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewCustomerBtn = () => {
    createCustomer(newCustomer)
      .then(() => {
        setReload(true);
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
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
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer)
      .then(() => {
        setReload(true);
        setUpdateCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (customer) => {
    setUpdateCustomer(customer);
  };

  const handleSearchCustomerByName = () => {
    getCustomerByName(customerSearch).then((data) => {
      setCustomers(data.content);
    });
  };

  const handleReset = () => {
    setCustomerSearch("");
    setCustomers(searchResults);
  };

  return (
    <div className="customer">
      <h3>New Customer</h3>
      <div className="customer-newcustomer">
        <input
          type="text"
          placeholder="Customer Name"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newCustomer.email}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />
        <button onClick={handleNewCustomerBtn}>Add</button>
        {alert === 1 && (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        )}
      </div>
      <h3>Update Customer</h3>
      <div className="customer-updatecustomer">
        <input
          type="text"
          placeholder="Customer Name"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />
        <button onClick={handleUpdateCustomerBtn}>Update</button>
        {alert === 2 && (
          <Alert severity="error">Please select a customer!</Alert>
        )}
      </div>
      <h3>Search Customer</h3>
      <div className="customer-search">
        <input
          type="text"
          placeholder="Enter Name"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchCustomerByName}>
          Search
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="list">
      <h2>Customer List</h2>
              <div className="table-container">
          <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.email}</td>
              <td>
                <span onClick={() => handleUpdateIcon(customer)}>
                  <UpdateIcon />
                </span>
                <span onClick={() => handleDelete(customer.id)}>
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

export default Customer;
