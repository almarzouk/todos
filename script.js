let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// Create Empty array to store the tasks
let arrayOfTasks = [];

// Check if there is data in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

function addTasksToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    complited: false,
  };
  // Push Task data to Array of task
  arrayOfTasks.push(task);
  // Add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // Add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}
// remove element from page
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Reomve from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove element from page
    e.target.parentElement.remove();
  }
  // Task done
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
  }
});
function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // Create main div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.complited) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete BTN
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append btn to div
    div.appendChild(span);
    // Add Task Div to Tasks container
    tasksDiv.appendChild(div);
  });
}
// the  function that will work on clcik to
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  }
});
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
