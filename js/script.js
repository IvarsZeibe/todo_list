let editedTaskId = -1;
let tasks = [];

window.addEventListener("load", ()=>{
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    render();
})

document.getElementById("new-button").addEventListener("click", ()=>{
    editedTaskId = -1;
    document.getElementById("form-title").innerHTML = "Pievienot jaunu uzdevumu";
    document.getElementById("overlay").style.display = "flex";
});
document.getElementById("cancel-button").addEventListener("click", closeForm);
document.getElementById("complete-button").addEventListener("click", ()=>{
    if(document.getElementById("new-task").value === ""){
        alert("Nav ievadīts uzdevums");
    }
    else{
        if(editedTaskId === -1){
            add();
        }
        else{
            edit();
        }
        closeForm();
    }
})
document.getElementById("todo-table").addEventListener("click", (e)=>{
    button = e.target;
    if(button.className == "remove-button"){
        remove(button);
    }
    else if(button.className == "edit-button"){
        openEditForm(button);
    }
})
function remove(button) {
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == button.parentElement.parentElement.id){
            tasks.splice(i, 1);
        }
    }
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
    document.getElementById("form-title").innerHTML = "Rediģēt uzdevumu";
    document.getElementById("overlay").style.display = "flex";
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
    form = document.getElementById("new-todo-form");
    let task =
    {"task": document.getElementById("new-task").value,
    "date": document.getElementById("new-due-date").value,
    "time": document.getElementById("new-due-time").value,
    "id": getNewId()};
    tasks.push(task);
    render();
}
function getNewId(id = 0){
    tasks.forEach(task => {
        if(task.id == id){
            id = getNewId(id + 1);
            return;
        }
    });
    return id;
}
function closeForm() {
    document.getElementById("new-task").value = "";
    document.getElementById("new-due-date").value = "";
    document.getElementById("new-due-time").value = "";
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
            <span class="remove-column"><button class="remove-button">Dzēst</button></span>
            <span class="edit-column"><button class="edit-button">Rediģēt</button></span>`;
        todoTable.insertBefore(todo, document.getElementById("new-button"));
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}