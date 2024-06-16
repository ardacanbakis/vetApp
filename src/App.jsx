import { Route, Routes } from "react-router-dom";
import Customer from "./Pages/Customer/Customer";
import Animal from "./Pages/Animal/Animal";
import Doctor from "./Pages/Doctor/Doctor";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Appointment from "./Pages/Appointment/Appointment";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Report from "./Pages/Report/Report";
import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/doctor" element={<Doctor />}>
          <Route index={true} element={<AvailableDate />} />
        </Route>
        <Route path="/availableDate" element={<AvailableDate />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/vaccine" element={<Vaccine />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}
export default App;
