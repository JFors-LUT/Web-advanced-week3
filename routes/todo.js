var express = require('express');
var router = express.Router();
var  todo_array = []

/* POST users listing. */
router.post('/', (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo;
    
    let userFound = false;
    for (let i = 0; i < todo_array.length; i++) {
        const user = todo_array[i];
        
        compare_to = JSON.stringify(user).split(":");
        const compare_to_clean = compare_to[0].substring(2, compare_to[0].length - 1);

        if (compare_to_clean === name){
            todo_array[i][name].push(todo)
            userFound = true;
            break;
          } 
        }

    
    
    if (userFound) {
        res.status(200).json({ message: 'Todo added'});
    } else{ 
    const new_entry = {[name]:[todo]};
    todo_array.push(new_entry);
    res.status(200).json({ message: 'User added'});
    }
  });
  

module.exports = { router, todo_array };

