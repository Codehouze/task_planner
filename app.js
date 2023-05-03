const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./api/config/db");
const app = express();
const bodyParser = require("body-parser");
const shiftRoutes = require("./api/routes/shiftRoutes");
const workerRoutes = require("./api/routes/workerRoutes");
const workerShiftRoutes = require("./api/routes/workShiftRoutes");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//connect db
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  connectDB();
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Register routes
app.use("/api/v1/shift", shiftRoutes);
app.use("/api/v1/auth/worker", workerRoutes);
app.use("/api/v1/worker_shift", workerShiftRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

module.exports = app;
