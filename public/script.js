let userRole = "";
let projects = [];

// ================= SIGNUP =================
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  const res = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: email.split("@")[0],
      email,
      password,
      role: "admin"
    })
  });

  const data = await res.json();
  alert(data.message || "Signup successful");
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.user) {
    userRole = data.user.role;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("userName").innerText = data.user.name;

    alert("Login successful ✅");
  } else {
    alert(data.message);
  }
}

// ================= DASHBOARD =================
async function loadDashboard() {
  const res = await fetch(`/api/task/dashboard`);
  const data = await res.json();

  document.getElementById("dashboard").innerHTML = `
    <p><b>Total:</b> ${data.total}</p>
    <p><b>Pending:</b> ${data.pending}</p>
    <p><b>Completed:</b> ${data.completed}</p>
  `;
}

// ================= CREATE PROJECT =================
async function createProject() {
  const name = document.getElementById("projectName").value;

  if (!name) {
    alert("Enter project name");
    return;
  }

  const res = await fetch(`/api/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": "admin"
    },
    body: JSON.stringify({
      name,
      members: []
    })
  });

  const data = await res.json();

  if (data.project) {
    projects.push(data.project);
    updateProjectDropdown();
    alert("Project created ✅");
  } else {
    alert("Error creating project");
  }
}

// ================= UPDATE DROPDOWN =================
function updateProjectDropdown() {
  const select = document.getElementById("projectSelect");
  select.innerHTML = "";

  projects.forEach(p => {
    const option = document.createElement("option");
    option.value = p._id;
    option.textContent = p.name;
    select.appendChild(option);
  });
}

// ================= CREATE TASK =================
async function createTask() {
  const title = document.getElementById("title").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const projectId = document.getElementById("projectSelect").value;

  if (!title || !assignedTo || !projectId) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch(`/api/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": userRole
    },
    body: JSON.stringify({
      title,
      assignedTo,
      projectId
    })
  });

  const data = await res.json();

  if (data.task) {
    alert("Task created ✅");
    loadTasks();
  } else {
    alert("Error creating task");
  }
}

// ================= LOAD TASKS =================
async function loadTasks() {
  const res = await fetch(`/api/task`);
  const tasks = await res.json();

  let html = "";

  tasks.forEach(t => {
    html += `
      <p>
        <b>${t.title}</b> (${t.status})<br>
        Assigned: ${t.assignedTo}
      </p>
      <hr>
    `;
  });

  document.getElementById("taskList").innerHTML = html;
}