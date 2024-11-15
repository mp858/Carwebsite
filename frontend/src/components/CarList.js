import React, { useEffect, useState } from "react";
import { getCars } from "../api/api";
import { Link } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await getCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>My Cars</h2>
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link to="/cars/create" className="btn">Add New Car</Link>
      <ul>
        {filteredCars.map((car) => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>{car.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
