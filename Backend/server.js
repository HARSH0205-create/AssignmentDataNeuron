const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("./models/Data");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas database
mongoose.connect(
  "mongodb+srv://harshsinghvshk:ZBNznFNtwf5y81Au@cluster0.qe94qk0.mongodb.net/?retryWrites=true&w=majority",
    // "mongodb+srv://harshsinghvshk:ZBNznFNtwf5y81Au@cluster0.qe94qk0.mongodb.net/mydatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

// Check if connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas database");
});

// Add data endpoint
app.post("/data/add", async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.json({ message: "Data added successfully!", newData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update data endpoint
app.put("/data/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: "Data updated successfully!", updatedData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Count data endpoint
app.get("/data/count", async (req, res) => {
  try {
    const totalCount = await Data.countDocuments();
    res.json({ count: totalCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all data endpoint
app.get("/data", async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});