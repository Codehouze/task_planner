const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./api/config/db");
const app = express();
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//connect db
connectDB();
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api/v1/shift", require("./api/routes/shiftRoutes"));
app.use("/api/v1/auth/worker", require("./api/routes/workerRoutes"));
app.use("/api/v1/worker_shift", require("./api/routes/workShiftRoutes"));

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

module.exports = app;
