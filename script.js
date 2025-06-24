const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const statsDiv = document.getElementById("stats");
let tasks = [];

const API_URL = "http://localhost:3000/tasks";

window.addEventListener("load", () => {
  fetchTasksFromDB();

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const desc = document.getElementById("task-desc").value.trim();
  const priority = parseInt(document.getElementById("task-priority").value);
  const deadline = document.getElementById("task-deadline").value;
  const time = document.getElementById("task-time").value;

  if (!title || !deadline || !time) {
    alert("Please fill in title, deadline and time.");
    return;
  }

  const task = { title, desc, priority, deadline, time, status: "Pending" };
  await saveTaskToDB(task);
  taskForm.reset();
});

async function fetchTasksFromDB() {
  const res = await fetch(API_URL);
  tasks = await res.json();
  sortAndDisplayTasks();
  checkUpcomingNotifications();
}

async function saveTaskToDB(task) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  const saved = await res.json();
  tasks.push(saved);
  sortAndDisplayTasks();
  checkUpcomingNotifications();
}
  
  async function updateTaskStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  const updated = await res.json();
  const index = tasks.findIndex(t => t._id === id);
  tasks[index] = updated;
  sortAndDisplayTasks();

  // ✅ Show popup only on completion
  if (status === "Completed") {
    alert("🎉 Task Completed!");
  }
}


function deleteTaskFromUIOnly(id) {
  tasks = tasks.filter(t => t._id !== id);
  sortAndDisplayTasks();
}

function sortAndDisplayTasks() {
  tasks.sort((a, b) => {
    // First sort by priority (1 = High, 3 = Low)
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }

    // If same priority, then sort by date+time
    const aTime = new Date(`${a.deadline}T${a.time}`);
    const bTime = new Date(`${b.deadline}T${b.time}`);
    return aTime - bTime;
  });

  taskList.innerHTML = "";
  tasks.forEach(renderTaskCard);
  updateStats();
}


function renderTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card", `priority-${task.priority}`);
  if (task.status === "Completed") card.classList.add("completed");

  const dueDateTime = new Date(`${task.deadline}T${task.time}`);
  const now = new Date();

  if (task.status === "Pending" && dueDateTime < now) {
    card.style.border = "2px solid red";
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.status === "Completed";
  checkbox.addEventListener("change", () => {
    updateTaskStatus(task._id, checkbox.checked ? "Completed" : "Pending");
  });

  const title = document.createElement("div");
  title.classList.add("task-title");
  title.textContent = task.title;

  const desc = document.createElement("div");
  desc.classList.add("task-desc");
  desc.textContent = task.desc || "No description";

  const meta = document.createElement("div");
  meta.classList.add("task-meta");
  meta.innerHTML = `
    <span><img src="calendar.jpg" class="meta-icon" /> ${task.deadline}</span>
    <span><img src="clock.jpg" class="meta-icon" /> ${task.time}</span>
  `;

  const taskText = document.createElement("div");
  taskText.className = "task-text";
  taskText.append(title, desc, meta);

  const left = document.createElement("div");
  left.className = "task-left";
  left.append(checkbox, taskText);

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.innerHTML = `<img src="bin.svg" class="bin-icon" alt="Delete" />`;
  delBtn.onclick = () => {
    if (confirm("Remove this task from screen ")) {
      deleteTaskFromUIOnly(task._id);
    }
  };

  const content = document.createElement("div");
  content.className = "task-content";
  content.append(left, delBtn);

  card.append(content);
  taskList.appendChild(card);
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const overdue = tasks.filter(t => {
    const now = new Date();
    const due = new Date(`${t.deadline}T${t.time}`);
    return t.status === "Pending" && due < now;
  }).length;

  statsDiv.innerHTML = `
    <strong>Total:</strong> ${total} |
    <strong>Completed:</strong> ${completed} |
    <strong>Pending:</strong> ${pending} |
    <strong>Overdue:</strong> ${overdue}
  `;
}

function checkUpcomingNotifications() {
  if (Notification.permission !== "granted") return;

  const now = new Date();
  tasks.forEach(task => {
    if (task.status === "Pending") {
      const due = new Date(`${task.deadline}T${task.time}`);
      const diff = (due - now) / (1000 * 60);

      if (diff > 0 && diff <= 10) {
        new Notification("Upcoming Task", {
          body: `${task.title} at ${task.time}`,
          icon: "bell.png"
        });
      }
    }
  });
}
