const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./api/config/db");
const app = express();

dotenv.config();

//connect db 
connectDB();
app.use("/api/v1/auth/user", require("./api/routes/userRoutes"));




const PORT = process.env.PORT || 3000;

app.listen(console.log(`we are live on ${PORT}`));
