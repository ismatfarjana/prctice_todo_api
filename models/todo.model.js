// set a variable for mongoose
//set variable for schema using mongoose schema
//create new todoschema using schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, required: true }
  },
  {
    timestamp: true
  }
);
//set variable for todo using model of todoschema
//export the model
const Todo = mongoose.model("task", todoSchema);
module.exports = Todo;
