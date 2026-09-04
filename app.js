const env = require("dotenv").config();
const express = require("express");
const cors = require("cors");

app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/students", require("./routes/student.routes"));

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`Server has started at http://${host}:${port}/`);
});
