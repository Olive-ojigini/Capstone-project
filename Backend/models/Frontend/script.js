const API_BASE = "mongodb://localhost:27017/taskmaster"; // Change this if deployed to a different domain

let token = null;

// Helper Function to Display Tasks
function displayTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Deadline:</strong> ${new Date(task.deadline).toLocaleDateString()}</p>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
}

// Register User
document.getElementById("register").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Error registering user");
  }
});

// Login User
document.getElementById("login").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      token = data.token;
      alert("Login successful!");
      fetchTasks();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error logging in");
  }
});

// Fetch Tasks
async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const tasks = await res.json();
    displayTasks(tasks);
  } catch (err) {
    console.error(err);
    alert("Error fetching tasks");
  }
}

// Add Task
document.getElementById("add-task").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, description, priority, deadline }),
    });
    if (res.ok) {
      alert("Task added successfully!");
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "Error adding task");
    }
  } catch (err) {
    console.error(err);
    alert("Error adding task");
  }
});

// Delete Task
async function deleteTask(taskId) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    if (res.ok) {
      alert("Task deleted successfully!");
      fetchTasks();
    } else {
      alert("Error deleting task");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting task");
  }
}
