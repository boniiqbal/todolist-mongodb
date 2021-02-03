const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express()

mongoose.connect("mongodb://localhost/tododb", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const todoListModel = mongoose.model("todo", {
  content: String,
  status: Boolean
})

// create todo
app.post("/todo", async (req, res) => {
  try {
    var todo = new todoListModel(req.body)
    var result = await todo.save();
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

// get list todo
app.get("/todo", async (req, res) => {
  try {
    var result = await todoListModel.find().exec()
    res.send(result)
  } catch (error) {
    res.status(500).send(error);
  }
})

// get detail todo
app.get("/todo/:id", async (req, res) => {
  try {
    var result = await todoListModel.findById(req.params.id).exec()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

// update todo 
app.put("/todo/:id", async (req, res) => {
  try {
    var todo = await todoListModel.findById(req.params.id).exec()
    todo.set(req.body)
    var result = await todo.save()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

//delete todo
app.delete("/todo/:id", async (req, res) => {
  try {
    var result = await todoListModel.deleteOne({ _id: req.params.id }).exec()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log("Listening at :3000...");
})