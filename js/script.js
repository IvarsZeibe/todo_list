let editedTaskId = -1;

let id = 0;
let tasks = [];

document.getElementById("new-button").addEventListener("click", ()=>{
    editedTaskId = -1;
    document.getElementById("overlay").style.display = "flex";
});

document.getElementById("cancel-button").addEventListener("click", closeForm());
document.getElementById("complete-button").addEventListener("click", ()=>{
    if(editedTaskId === -1){
        add();
    }
    else{
        edit();
    }
    closeForm();
})
function remove(button) {
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == button.parentElement.parentElement.id){
            tasks.splice(i, 1);
        }
    }
    render();
}
function edit(button) {
    for(let task of tasks){
        if(task.id == editedTaskId){
            task.task = document.getElementById("new-task").value;
            task.date = document.getElementById("new-due-date").value;
            task.time = document.getElementById("new-due-time").value;
            break;
        }
    }
    render();
}
function add() {
    id++;
    form = document.getElementById("new-todo-form");
    let task =
    {"task": document.getElementById("new-task").value,
    "date": document.getElementById("new-due-date").value,
    "time": document.getElementById("new-due-time").value,
    "id": id};
    tasks.push(task);
    render();
}
function openEditForm(button) {
    editedTaskId = button.parentElement.parentElement.id;
    
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == editedTaskId)
        document.getElementById("new-task").value = tasks[i].task;
        document.getElementById("new-due-date").value = tasks[i].date;
        document.getElementById("new-due-time").value = tasks[i].time;
    }
    openForm();
}
function openForm(createTodo = true){
    document.getElementById("overlay").style.display = "flex";
}
function closeForm() {
    document.getElementById("new-task").value = "";
    document.getElementById("new-due-date").value = "";
    document.getElementById("overlay").style.display = "none";
}
function render(){
    let todoTable = document.getElementById("todo-table");
    let len = todoTable.children.length - 1;
    for (let i = 1; i < len; i++) {
        todoTable.children[1].remove()
    }
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        todo = document.createElement("div");
        todo.id = task.id;
        todo.classList.add("task-box");
        todo.innerHTML = `
            <span class="task">${task.task}</span>
            <span class="date">${task.date}</span>
            <span class="time">${task.time}</span>
            <span class="remove-column"><button class="remove-button" onclick="remove(this)">Dzēst</button></span>
            <span class="edit-column"><button class="edit-button" onclick="openEditForm(this)">Rediģēt</button></span>`;
        todoTable.insertBefore(todo, document.getElementById("new-button"));
    }
}