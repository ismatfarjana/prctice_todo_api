const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.NODE_ENV === "test" ? process.env.ATLAS_TEST_URI : process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongoose!");
  })
  .catch(err => {
    console.error("Error connecting to Mongo", err);
  });

//routes
const todosRouter = require("./routes/todos");
app.use("/", todosRouter);

app.listen(port, () => {
  console.log(`Congrates! express is listening on port ${port}!`);
});

module.exports = app; // for testing
