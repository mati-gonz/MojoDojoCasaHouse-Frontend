import { useEffect, useState } from "react";
import "../assets/styles/views/landing.css";
import dataTable from "../components/dataTable";
import axios from "axios";

const AdminView = () => {
  const [cinemas, setCinemas] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/cinemas`);
        setCinemas(response.data);
      } catch (error) {
        console.error("Error al obtener los cines", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landingLayout">
      <dataTable />
    </div>
  );
};

export default AdminView;
