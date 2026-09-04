const dbCon = require("../db");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password } = req.body;

  var SQL = "insert into users(name,email,password)values(?,?,?)";

  const hashedPassword = bcryptjs.hashSync(password, 10);

  dbCon.query(SQL, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "registration error",
        error: err,
      });
    } else {
      if (result.affectedRows == 1) {
        return res.status(200).json({
          message: "User regsistration Successfully Done",
          user: {
            name: name,
            email: email,
          },
        });
      } else {
        return res.status(200).json({ message: "Registration failed" });
      }
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const SQL = "select * from users where email=?";

  dbCon.query(SQL, [email], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err,
      });
    } else {
      if (!user[0]) {
        return res.status(200).json({ status: "No such user found" });
      } else {
        let hashed_pass = user[0]?.password;
        let isMatch = bcryptjs.compareSync(password, hashed_pass)
          ? true
          : false;
        if (isMatch) {
          const token = jwt.sign(
            { user_id: user[0].user_id },
            process.env.JWT_SECRET,
            { expiresIn: "10m" },
          );

          return res.status(200).json({
            message: "Login successful",
            user: {
              user_id: user[0].user_id,
              name: user[0].name,
              email: user[0].email,
            },
            token,
          });
        } else {
          return res.status(200).json({ status: "Invalid Credentials" });
        }
      }
    }
  });
};

module.exports = {
  register,
  login,
};
