function remove(button) {
    todoBox = button.parentElement;
    todoBox.remove();
}
function edit(button) {

}
function add() {
    form = document.getElementById(newTodoForm);
    todo = document.createElement("div");
    todo.innerHTML = `
        <div class="taskBox">
            <span class="task">${document.getElementById("newTask").value}</span>
            <span class="dueDate">${document.getElementById("newDueDate").value}</span>
            <button id="RemoveButton" onclick="remove(this)">Dzēst</button>
            <button id="EditButton" onclick="edit(this)">Rediģēt</button>
        </div>`;
    document.getElementById("taskCanvas").insertBefore(todo, document.getElementById("openForm"));
    document.getElementById("overlay").style.display = "none";
}
function openForm(){
    document.getElementById("overlay").style.display = "flex";
}