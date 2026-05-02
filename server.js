require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const app = express();
app.use(express.json());
app.use(logger);

// DB connection
connectDB();

// Routes
app.use("/assignments", require("./routes/assignmentRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(process.env.MONGO_URI)