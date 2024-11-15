import React, { useEffect, useState } from "react";
import { getCar, deleteCar } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await getCar(id);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await deleteCar(id);
    navigate("/cars");
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(", ")}</p>
      <button onClick={() => navigate(`/cars/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarDetail;
