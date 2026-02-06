require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const documentRoutes = require("./routes/documents.routes");

const app = express();

app.use(cors()); 
app.use(express.json());
app.use("/api/documents", documentRoutes);

connectDB();

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
app.get("/", (req, res) => {
  res.send("Mini Document Manager API is running");
});
