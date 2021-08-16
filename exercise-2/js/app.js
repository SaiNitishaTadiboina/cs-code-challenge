let taskToDoArr = {};
var incompleteTasksHolder = document.getElementById("incomplete-tasks-list");
var completedTasksHolder = document.getElementById("completed-tasks-list");

function init() {
    const todo = localStorage.getItem("taskToDoArr");
    if (todo) {
        taskToDoArr = JSON.parse(todo);
        const existingList = Object.keys(taskToDoArr);
        for (let i = 0; i < existingList.length; i++) {
            addTaskOnClick(taskToDoArr[existingList[i]], existingList[i]);
        }
    }
}

const setLocalStorage = () => {
    localStorage.setItem("taskToDoArr", JSON.stringify(taskToDoArr));
}

const createNewTaskElement = function (taskStringObj, id) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    listItem.id = id ? id : new Date().getTime();
    checkBox.type = "checkbox";
    checkBox.tabIndex = 0;
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskStringObj.name;
    if (taskStringObj.isCompleted) {
        checkBox.checked = true;
    }

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const inputValueKeyDown = () => {
    if (this.event.keyCode === 13) {
        addTask();
    }
}

const addTask = () => {
    const taskInput = document.getElementById("new-task-input");
    let listItemName = taskInput.value;
    listItemName = listItemName && listItemName.trim();
    if (listItemName) {
        const listItemNameObj = { "name": listItemName, "isCompleted": false };
        const currentListItem = addTaskOnClick(listItemNameObj);
        taskToDoArr[currentListItem["id"]] = listItemNameObj;
        setLocalStorage();
    } else {
        alert("Task cannot be empty");
    }
    taskInput.value = "";
}

var addTaskOnClick = function (valueObj, id) {
    const listItem = createNewTaskElement(valueObj, id);
    const folderToAppend = valueObj.isCompleted ? completedTasksHolder : incompleteTasksHolder;
    folderToAppend.appendChild(listItem);
    const eventToBind = valueObj.isCompleted ? taskIncomplete : taskCompleted;
    bindTaskEvents(listItem, eventToBind);
    return listItem;
};

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
        taskToDoArr[listItem["id"]]["name"] = editInput.value;
        setLocalStorage();
        button.innerText = "Edit";
    } else {
        editInput.value = label.innerText
        button.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    delete taskToDoArr[listItem["id"]];
    setLocalStorage();
    ul.removeChild(listItem);
};

var taskCompleted = function (el) {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    taskToDoArr[listItem["id"]]["isCompleted"] = true;
    setLocalStorage();
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    taskToDoArr[listItem["id"]]["isCompleted"] = false;
    setLocalStorage();
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};
