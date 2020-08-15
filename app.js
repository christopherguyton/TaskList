//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')
const delItem = document.querySelector('.delete-item');

// Load All event listeners

loadEventListeners();

function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add Task Event
    form.addEventListener('submit', addTask);
//Remove Task Event
   taskList.addEventListener('click', removeTask);

   //Clear Task Event
   clearBtn.addEventListener('click', clearTasks);

   //Filter Tasks Event
   filter.addEventListener('keyup', filterTasks)

}

//Get Tasks from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create Text Node and Append to Li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
});
}

//Add Task

function addTask(e){
    if (taskInput.value === '') {
        alert('Add A Task')
    } else {
    //Create Li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create Text Node and Append to Li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store In LS
    storeTaskinLocalStorage(task.value);
    taskInput.value = '';
   
    }
    e.preventDefault();
}

//Store Task

function storeTaskinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')) {
       e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks(){
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
}
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}