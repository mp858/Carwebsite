const Car = require("../models/Car");

exports.createCar = async (req, res) => {
  try {
    const car = await Car.create({ ...req.body, user: req.userId });
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: "Error creating car" });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: "Error updating car" });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
