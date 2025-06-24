//Loading the required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//setting up app & middleware
const app = express();
app.use(cors());
app.use(express.json());

//MongoDB Atlas Connection
mongoose.connect("mongodb+srv://varun9:higoku900@taskify.e17rbfa.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Taskify")
  .then(() => console.log(" MongoDB Atlas connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

//Manage schema & model
const taskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  priority: Number,
  deadline: String,
  time: String,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

//REST API routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(" Error saving task:", err);
    res.status(500).json({ error: "Failed to save task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.patch("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

//Run server 
app.listen(3000, () => console.log(" Server running at http://localhost:3000"));
