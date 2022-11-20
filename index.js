const express = require("express");
const app = express();
const port = 3000;

//const inputName = document.createElement("input")
//inputName.id = "input-name"

//const inputTask = document.createElement("input")
//inputTask.id = "input-task"

let inputText = [];


app.get("/", (req, res) =>{
  res.write("<h1>My todos</h1>")
  res.write("Enter name: <input id='input-name'><br> \
  Enter task: <input id='input-task'><br>")
  res.write("<button id='submit-data'>Submit</button>")
  res.end()
})

app.post("/", (req, res)=>{
  res.send(req.body);
  inputText.push(req.body)
  console.log(req.body)
})


app.listen(port, () => console.log("Toimii"))