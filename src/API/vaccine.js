import axios from "axios";

export const getVaccines = async () => {
  const { data } = await
    axios.get(
      import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations");
  console.log(data);
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${id}`
  );
  return data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations`,
    vaccine
  );
  return data;
};

export const updateVaccineFunc = async (vaccine) => {
  const { data } = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${vaccine.id}`,
    vaccine
  );
  return data;
};

export const getVaccineByName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/searchByName?name=${name}`
  );

  return data;
};


export const getVaccineByAnimalName = async (animalName) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/searchByAnimal?name=${animalName}`
  );
  return data;
};



export const getVaccinesByDate = async (startDate, endDate) => {

  const { data } = await
    axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/searchByDate?startDate=${startDate}&endDate=${endDate}`
    );
  console.log(data);
  return data;
};