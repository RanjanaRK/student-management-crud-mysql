const dbCon = require("../db");

const getStudents = (req, res) => {
  const sql = "SELECT * FROM students;";
  dbCon.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

const getSignleStudent = (req, res) => {
  const sql = "SELECT * FROM students WHERE student_id=?;";
  dbCon.query(sql, [req.params.studentId], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

const addStudent = (req, res) => {
  const { name, email, phone, course } = req.body;

  const SQL =
    "INSERT into students (name,email, phone, course) values(?,?,?,?)";

  dbCon.query(SQL, [name, email, phone, course], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      if (result.affectedRows == 1) {
        return res.status(200).json({ message: "Added student Successfully" });
      } else {
        return res.status(200).json({ message: "Unable to add student" });
      }
    }
  });
};

const updateStudent = (req, res) => {
  const { name, email, phone, course } = req.body;
  const { studentId } = req.params;

  const SQL =
    "UPDATE students SET name=?, email=?, phone=?, course=? WHERE student_id=?";

  dbCon.query(SQL, [name, email, phone, course, studentId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      if (result.affectedRows == 1) {
        return res
          .status(200)
          .json({ message: "Updated student Successfully" });
      } else {
        return res.status(200).json({ message: "Unable to update student" });
      }
    }
  });
};

const deleteStudent = (req, res) => {
  const { studentId } = req.params;

  const SQL = "DELETE FROM students WHERE student_id=?";

  dbCon.query(SQL, [studentId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      if (result.affectedRows == 1) {
        return res
          .status(200)
          .json({ message: "Deleted student Successfully" });
      } else {
        return res.status(200).json({ message: "Unable to delete student" });
      }
    }
  });
};

module.exports = {
  getStudents,
  getSignleStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
