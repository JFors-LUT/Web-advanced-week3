const express = require("express");
const app = express();
const port = 3000;
const pug = require('pug');

// Compile the source code
const compiledFunction = pug.compileFile('template.pug');



// Render the function

// "<p>Forbes's Pug source code!</p>"s

//const inputName = document.createElement("input")
//inputName.id = "input-name"

//const inputTask = document.createElement("input")
//inputTask.id = "input-task"

let inputText = [];


app.get("/", (req, res) =>{

  res.write(compiledFunction())
  res.end()
})

app.post("/", (req, res)=>{
  res.send(req.body);
  inputText.push(req.body)
  console.log(req.body)
})


app.listen(port, () => console.log("Toimii"))