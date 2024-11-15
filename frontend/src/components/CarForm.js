import React, { useState, useEffect } from "react";
import { createCar, updateCar, getCar } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const CarForm = ({ editMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      const fetchCar = async () => {
        const { data } = await getCar(id);
        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags.join(", "));
      };
      fetchCar();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { title, description, tags: tags.split(",").map((tag) => tag.trim()) };
    if (editMode) {
      await updateCar(id, carData);
    } else {
      await createCar(carData);
    }
    navigate("/cars");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{editMode ? "Edit Car" : "Add Car"}</h2>
        <input
          type="text"
          placeholder="Car Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">{editMode ? "Update Car" : "Add Car"}</button>
      </form>
    </div>
  );
};

export default CarForm;
