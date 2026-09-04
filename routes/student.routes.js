const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/auth.middleware");
const {
  getStudents,
  getSignleStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

router.get("/", checkAuth, getStudents);

router.get("/:studentId", checkAuth, getSignleStudent);

router.post("/add", checkAuth, addStudent);

router.put("/update/:studentId", checkAuth, updateStudent);

router.delete("/delete/:studentId", checkAuth, deleteStudent);

module.exports = router;
console.log("router is running");
