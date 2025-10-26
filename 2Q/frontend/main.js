const form = document.getElementById("registerForm");
const messageDiv = document.getElementById("message");

// Create a container to show all users
const usersDiv = document.createElement("div");
usersDiv.style.marginTop = "16px";
document.getElementById("app").appendChild(usersDiv);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  if (!username || !password) {
    return showMsg("Enter both username and password", "red");
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // Show message
    showMsg(res.ok ? `${data.message}` : ` ${data.message}`, res.ok ? "green" : "red");

    // Reset form
    form.reset();

    // Update list of all registered users
    if (res.ok && data.allUsers) {
      showUsers(data.allUsers);
    }
  } catch {
    showMsg("Error connecting to server", "red");
  }
});

function showMsg(msg, color) {
  messageDiv.textContent = msg;
  messageDiv.style.color = color;
}

// Display users below the form
function showUsers(users) {
  usersDiv.innerHTML = "<h3>Registered Users:</h3>";
  const ul = document.createElement("ul");
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.username;
    ul.appendChild(li);
  });
  usersDiv.appendChild(ul);
}
