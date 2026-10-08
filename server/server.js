
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
require("dotenv").config();
const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

let connPromise = null;

function connectDB() {
  if (!connPromise) {
    connPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    }).catch((err) => {
      connPromise = null; // allow retry on next request
      throw err;
    });
  }
  return connPromise;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log("MongoDB connection error", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MONGODB");
})
.catch((error)=>{
    console.log("MongoDB connection error", error);
})

app.get("/",(req, res)=>{
    res.send("Server is running!");
});

app.get("/students", async (req, res)=>{
    const students=await Student.find();

    res.json(students);
});

app.post("/students", async (req, res) => {
   const student = new Student({
     name: req.body.name,
     course: req.body.course,
     age: req.body.age
    });

   await student.save();
     res.json(student);
});

app.put("/students/:id", async (req, res) => {
   const student = await Student.findByIdAndUpdate(
     req.params.id,
     {
       name: req.body.name,
       course: req.body.course,
       age: req.body.age
     },
     { new: true }
   );
   res.json(student);
});

app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

module.exports = app;