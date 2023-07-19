// main.js
const submit_button = document.getElementById('submit-data');
const search_button = document.getElementById('search');
const result_container = document.getElementById('result-container');

submit_button.addEventListener('click', () => {
  const name = document.getElementById('input-name').value;
  const todo = document.getElementById('input-task').value;

  const data = {
    name: name,
    todo: todo
  };

  fetch('/todo', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const message = data.message;
    console.log(message)
    result_container.innerHTML = message
    //document.getElementById('message-container').textContent = message;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});


search_button.addEventListener('click', () => {
  const search = document.getElementById('search-name').value;
  result_container.innerHTML = '';
  const delete_button = document.createElement('button');
  console.log(delete_button)

  //send GET
  fetch(`/user/${search}`)
    .then(response => response.json())
    .then(data => {
      const entry = Object.entries(data);
      const [key, value] = entry[0];
      const result = JSON.stringify(data);

      console.log(result);

      
      result_container.textContent = "User not found"
      
      delete_button.id = "delete-user"
      delete_button.textContent = 'Delete user: '+key
      //to delete and replace previous delete button
      const delete_user_button = document.getElementById('delete-user');
      if (delete_user_button) {
        delete_user_button.remove();
      }
      if(key !== 'message'){
      result_container.textContent = "Name: "+key+"\n Todo: "+value //result;
      document.body.appendChild(delete_button)
      }
      //add buttons to delete tasks
      const tasks = value;
      tasks.forEach(task => {
        const delete_task = document.createElement('button');
        delete_task.classList.add('delete-task');
        delete_task.textContent = 'Delete '+task;
        result_container.appendChild(delete_task);

        delete_task.addEventListener('click', () => {
          // Send PUT request to delete task
          fetch('/user', {
            method: 'PUT',
            body: JSON.stringify({
              id: key,
              task: task,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response =>{             
            if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            result_container.textContent = "User not found";
            throw new Error('User not found');  
          } else {
            throw new Error('Server error');
          }})
          .then(data => {
            const message = data.message;
            console.log(message);

            /* Remove the deleted task from the user interface
            result_container.removeChild(deleteButton);
            const taskParagraph = document.createElement('p');
            taskParagraph.textContent = 'Task deleted: ' + task;
            result_container.appendChild(taskParagraph);
            */
           result_container.innerHTML = message
          })
          .catch(error => {
            console.error('Error:', error);
          });
        });
      });

      //listen to delete
      delete_button.addEventListener('click', () => {
        delete_button.remove();
        fetch(`/user/${key}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
              result_container.textContent = "User not found";
              throw new Error('User not found');  
            } else {
              throw new Error('Server error');
            }
          })
          .then(data => {
            console.log('User deleted:', data);
            result_container.textContent = "User deleted";
          })
          .catch(error => {
            console.error('Error deleting user:', error);

    
          });
        });
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message
    });
});
