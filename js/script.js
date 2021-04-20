let editedTaskId = -1;

let id = 0;
let tasks = 
[{"task": "Izpildīt matemātiku",
"date": "2021-04-21",
"time": "08:20",
"id": id}];

function remove(button) {
    todoBox = button.parentElement.parentElement;
    todoBox.remove();
}
function edit(button) {
    console.log(editedTaskId.innerHTML);

    for(let task of tasks){
        if(task.id == editedTaskId){
            task.task = document.getElementById("newTask").value;
            task.date = document.getElementById("newDueDate").value;
            task.time = document.getElementById("newDueTime").value;
            break;
        }
    }
    render();
    // editedTask.innerHTML = `
    //     <span class="task">${document.getElementById("newTask").value}</span>
    //     <span class="date">${document.getElementById("newDueDate").value}</span>
    //     <span class="time">${document.getElementById("newDueTime").value}</span>
    //     <span class="removeColumn"><button id="removeButton" onclick="remove(this)">Dzēst</button></span>
    //     <span class="editColumn"><button id="editButton">Rediģēt</button></span>`;
}
function add() {
    id++;
    form = document.getElementById(newTodoForm);
    let task =
    {"task": document.getElementById("newTask").value,
    "date": document.getElementById("newDueDate").value,
    "time": document.getElementById("newDueTime").value,
    "id": id};
    tasks.push(task);
    render();
    // todo = document.createElement("div");
    // todo.id = id;
    // todo.innerHTML = `
    //     <div class="taskBox">
    //         <span class="task">${task.task}</span>
    //         <span class="date">${task.date}</span>
    //         <span class="time">${task.time}</span>
    //         <span class="removeColumn"><button id="removeButton" onclick="remove(this)">Dzēst</button></span>
    //         <span class="editColumn"><button id="editButton">Rediģēt</button></span>
    //     </div>`;
    // document.getElementById("taskCanvas").insertBefore(todo, document.getElementById("openAddForm"));
}
function opendEditForm(button) {
    editedTaskId = button.parentElement.parentElement.id;
    document.getElementById("newTask").value = tasks[editedTaskId].task;
    document.getElementById("newDueDate").value = tasks[editedTaskId].date;
    document.getElementById("newDueTime").value = tasks[editedTaskId].time;
    openForm();
}
document.getElementById("openAddForm").addEventListener('click', ()=>{
    editedTaskId = -1;
    openForm();
})
function openForm(){
    document.getElementById("overlay").style.display = "flex";
}
function closeForm() {
    document.getElementById("newTask").value = "";
    document.getElementById("newDueDate").value = "";
    document.getElementById("overlay").style.display = "none";
}
document.getElementById("completeButton").addEventListener("click", ()=>{
    if(editedTaskId === -1){
        add();
    }
    else{
        edit();
    }
    closeForm();
})
function render(){
    let taskCanvas = document.getElementById("taskCanvas");
    //let header = taskCanvas.children[0];
    let len = taskCanvas.children.length - 1;
    for (let i = 1; i < len; i++) {
        console.log(taskCanvas.children[1].innerHTML)
        taskCanvas.children[1].remove()
    }
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        todo = document.createElement("div");
        todo.id = task.id;
        todo.classList.add("taskBox");
        todo.innerHTML = `
            <span class="task">${task.task}</span>
            <span class="date">${task.date}</span>
            <span class="time">${task.time}</span>
            <span class="removeColumn"><button id="removeButton" onclick="remove(this)">Dzēst</button></span>
            <span class="editColumn"><button id="editButton" onclick="opendEditForm(this)">Rediģēt</button></span>`;
        taskCanvas.insertBefore(todo, document.getElementById("openAddForm"));
    }
}