const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

// Add Task
function addTask() {
  const taskText = taskInput.value.trim();

  // Validation
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.className = "complete-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Event Delegation
taskList.addEventListener("click", function (e) {
  const li = e.target.closest(".task-item");
  if (!li) return;

  const taskId = Number(li.dataset.id);

  if (e.target.classList.contains("complete-btn")) {
    tasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter(task => task.id !== taskId);
  }

  renderTasks();
});

// Button Click
addBtn.addEventListener("click", addTask);

// Enter Key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});