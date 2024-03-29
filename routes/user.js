var express = require('express');
var router = express.Router();
const { todo_array } = require('./todo');


router.get('/:id', function(req, res, next) {
  var user = false
  const userId = req.params.id;
  var count = -1
  var return_user = null

  todo_array.forEach(jsonObject => {
    const key = Object.keys(jsonObject);
    count += 1;
    if (key.includes(userId)){
      user = true;
      return_user = todo_array[count];
      console.log("key check:"+return_user);
    } 
  });

  if (user) {
    console.log("if return check:"+return_user);
    res.status(200).json(return_user);
    //res.status(200).json({ message: 'User found' });
  } else {
    console.log("else return check:"+return_user);
    res.status(404).json({ message: 'User not found' });
  }
});


router.delete('/:id', function(req, res, next) {
  const userId = req.params.id;

  // find in todo_array
  const user = todo_array.find(obj => Object.keys(obj)[0] === userId);

  if (user) {
    // delete from todo_array, get user index and remove
    const index = todo_array.indexOf(user);
    todo_array.splice(index, 1);

    res.status(200).json({ message: 'User deleted', userId });
  } else {
    res.status(404).json({ message: 'User not found', userId });
  }
});

router.put('/', function(req, res, next) {
  const userId = req.body.id; 
  const taskToDelete = req.body.task; 

  let userFound = false;
  for (let i = 0; i < todo_array.length; i++) {
    const user = todo_array[i];

    const key = Object.keys(user)[0];
    if (key === userId) {
      const tasks = user[key];
      const index = tasks.indexOf(taskToDelete);
      if (index !== -1) {
        tasks.splice(index, 1);
        userFound = true;
        break;
      }
    }
  }

  if (userFound) {
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


module.exports = router;