import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
  getAnimalByCustomerName,
} from "../../API/animal";
import { getCustomers } from "../../API/customer";
import "./Animal.css";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
    id: "",
  });

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data.content);
      setSearchResults(data.content);
    });
    getCustomers().then((data) => {
      setCustomers(data.content);
    });
    setReload(false);
  }, [reload]);

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
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
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateAnimalInputs = (event) => {
    if (event.target.name === "customer") {
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAnimalBtn = () => {
    updateAnimalFunc(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
            id: "",
          },
          id: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (animal) => {
    setUpdateAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer,
      id: animal.id,
    });
  };

  const handleSearchAnimalByName = () => {
    getAnimalByName(search).then((data) => {
      setAnimals(data.content);
    });
  };

  const handleSearchAnimalByCustomerName = () => {
    getAnimalByCustomerName(customerSearch).then((data) => {
      setAnimals(data.content);
    });
  };

  const handleReset = () => {
    setSearch("");
    setCustomerSearch("");
    setAnimals(searchResults);
  };

  return (
    <div className="animal">
      <div className="animal-newanimal">
        <h3>Add New Pet</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Color"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />
        <select
          value={newAnimal.customer.id}
          name="customer"
          onChange={handleNewAnimal}
        >
          <option value="" disabled={true} selected={true}>
            Select Customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleNewAnimalBtn}>Add</button>
        {alert === 1 && (
          <Alert severity="error">
            Please review your information and try again!
          </Alert>
        )}
      </div>

      <div className="animal-updateanimal">
        <h3>Update Pet</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Color"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputs}
        />
        <select
          value={updateAnimal.customer.id}
          name="customer"
          onChange={handleUpdateAnimalInputs}
        >
          <option value="" disabled={true} selected={true}>
            Select Customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleUpdateAnimalBtn}>Update</button>
        {alert === 2 && (
          <Alert severity="error">Please select an animal</Alert>
        )}
      </div>

      <div className="animal-search">
        <h3>Search Pet</h3>
        <input
          type="text"
          placeholder="Enter Pet Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearchAnimalByName}>Search</button>

        <h3>Search Customer</h3>
        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <button onClick={handleSearchAnimalByCustomerName}>Search</button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="list">
        <h2>Pet List</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Color</th>
                <th>Date of Birth</th>
                <th>Customer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(animal)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(animal.id)}>
                      <DeleteIcon />
                    </span>
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

export default Animal;
