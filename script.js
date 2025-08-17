// Example jobs data
const jobs = [
  {
    title: "Sales Executive",
    location: "Mumbai",
    description: "Seeking energetic candidates for sales and marketing roles. Freshers welcome.",
  },
  {
    title: "Accountant",
    location: "Delhi",
    description: "Experience with accounting softwares and at least 2 years in similar role required.",
  },
  {
    title: "Site Supervisor",
    location: "Pune",
    description: "Supervise teams, manage schedules, and ensure safety compliance.",
  }
];

// Populate job list
const jobList = document.getElementById("jobList");
jobs.forEach((job, idx) => {
  const card = document.createElement("div");
  card.className = "job-card";
  card.innerHTML = `
    <h3>${job.title}</h3>
    <p><strong>Location:</strong> ${job.location}</p>
    <p>${job.description}</p>
    <button onclick="openApplyModal('${job.title}')">Apply</button>
  `;
  jobList.appendChild(card);
});

// Modal interaction
const applyModal = document.getElementById('applyModal');
const closeModalBtn = document.getElementById('closeModal');
const applyForm = document.getElementById('applyForm');
const confirmation = document.getElementById('confirmation');
const jobTitleInput = document.getElementById('jobTitle');

window.openApplyModal = function(title) {
  jobTitleInput.value = title;
  applyModal.style.display = "block";
  confirmation.innerText = "";
  applyForm.reset();
};

closeModalBtn.onclick = function() {
  applyModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == applyModal) {
    applyModal.style.display = "none";
  }
};

// Handle application submission
applyForm.onsubmit = function(e) {
  e.preventDefault();
  // Simple input validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !email || !phone) {
    confirmation.style.color = "red";
    confirmation.innerText = "Please fill all required fields.";
    return;
  }
  confirmation.style.color = "green";
  confirmation.innerText = `Thank you, ${name}! Your application for "${jobTitleInput.value}" has been submitted.`;
  applyForm.reset();
};
