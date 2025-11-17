/* -------------------------------------------------------
   SIMPLE TWO-LINE CHART (Today vs Yesterday)
------------------------------------------------------- */

const ctx = document.getElementById("trendsChart").getContext("2d");

// Soft blue gradient under "Today"
const gradient = ctx.createLinearGradient(0, 0, 0, 150);
gradient.addColorStop(0, "rgba(74, 99, 255, 0.25)");
gradient.addColorStop(1, "rgba(74, 99, 255, 0)");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    ],

    datasets: [
      {
        label: "Today",
        data: [7, 10, 12, 8, 15, 22, 25, 20, 18, 15, 10, 8, 5, 8, 16, 18, 20, 17, 14, 10],
        borderColor: "#4A63FF",
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.35
      },

      {
        label: "Yesterday",
        data: [6, 8, 10, 7, 12, 18, 21, 18, 17, 14, 9, 7, 5, 7, 12, 15, 18, 15, 13, 9],
        borderColor: "#d6d7e0",
        borderWidth: 2,
        fill: false,
        tension: 0.35
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: true }
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9fa2b4" }
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f1f3" },
        ticks: { color: "#9fa2b4" }
      }
    }
  }
});


/* -------------------------------------------------------
   MODAL FORM — Add New Task
------------------------------------------------------- */

const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskTagInput = document.getElementById("taskTag");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = taskNameInput.value.trim();
  if (!name) return;

  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  // Left side (checkbox + task name)
  li.innerHTML = `
    <div>
      <input type="checkbox" class="form-check-input me-2">
      ${name}
    </div>
  `;

  // Right side badge
  const badge = document.createElement("span");
  badge.classList.add("badge");

  if (taskTagInput.value === "urgent") {
    badge.classList.add("bg-danger");
    badge.textContent = "URGENT";
  } 
  else if (taskTagInput.value === "new") {
    badge.classList.add("bg-success");
    badge.textContent = "NEW";
  } 
  else {
    badge.classList.add("bg-secondary");
    badge.textContent = "DEFAULT";
  }

  li.appendChild(badge);

  document.querySelector(".task-list").appendChild(li);

  // Reset form
  taskNameInput.value = "";
  taskTagInput.value = "default";

  // Close modal
  bootstrap.Modal.getInstance(document.getElementById("taskModal")).hide();
});
