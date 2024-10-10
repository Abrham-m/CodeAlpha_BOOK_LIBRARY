const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const indexRouter = require("./routes/index");

const app = express();
 
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors({
  origin: 'http://localhost:3000'
})); 
app.use(express.json());

app.use("/", indexRouter);
 
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
