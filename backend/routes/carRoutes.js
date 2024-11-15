const express = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/create", createCar);
router.get("/", getCars);
router.get("/:id", getCar);
router.put("/:id/update", updateCar);
router.delete("/:id/delete", deleteCar);

module.exports = router;
