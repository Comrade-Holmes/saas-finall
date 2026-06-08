const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
// Temporarily allow all origins for testing. Revert before production.
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI ||
  "mongodb+srv://suryasurya199250_db_user:cecKWFfnJ5ya5ouV@cluster0.kf5d1or.mongodb.net/saasapp?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    status: "Backend Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
