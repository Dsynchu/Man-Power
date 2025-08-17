const jobs = [
  {
    title: "Sales Executive",
    location: "Mumbai",
    salary: "₹25,000 – ₹40,000/month",
    exp: "1+ years (Freshers Welcome)",
    description: "Seeking energetic candidates for sales and marketing roles. Strong communication skills and a passion for customer relations required.",
    skills: ["Sales", "Marketing", "CRM", "Fieldwork"],
    benefits: ["Incentives & Bonuses", "Corporate Training", "Travel Allowance"]
  },
  {
    title: "Senior Accountant",
    location: "Delhi",
    salary: "₹38,000 – ₹55,000/month",
    exp: "Min 3 years",
    description: "Manage accounts, prepare financial reports and analyze budgets. Experience with Tally and GST mandatory.",
    skills: ["Tally", "GST", "Excel", "Financial Reporting"],
    benefits: ["Health Insurance", "Professional Development", "Performance Bonus"]
  },
  {
    title: "Site Supervisor",
    location: "Pune",
    salary: "₹22,000 – ₹35,000/month",
    exp: "2+ years",
    description: "Supervise onsite teams, manage work schedules, and ensure safety compliance at all times.",
    skills: ["Team Management", "Safety Compliance", "Project Planning"],
    benefits: ["PF & ESI", "Travel Allowance", "Safety Trainings"]
  },
  {
    title: "Java Software Developer",
    location: "Bangalore",
    salary: "₹42,000 – ₹65,000/month",
    exp: "2+ years",
    description: "Design, build and maintain scalable Java applications. Familiarity with Spring and REST APIs necessary.",
    skills: ["Java", "Spring", "REST APIs", "MySQL"],
    benefits: ["WFH Option", "Stock Options", "Tech Conferences"]
  }
];

const jobList = document.getElementById('jobList');
jobs.forEach((job, idx) => {
  const card = document.createElement("div");
  card.className = "job-card";
  card.innerHTML = `
    <h3>${job.title}</h3>
    <div class="location"><strong>Location:</strong> ${job.location}</div>
    <div class="salary"><strong>Salary:</strong> ${job.salary}</div>
    <div class="exp"><strong>Experience:</strong> ${job.exp}</div>
    <div class="desc">${job.description}</div>
    <div class="skills"><strong>Skills:</strong>
      <ul class="skills-list">${job.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    </div>
    <div class="benefits"><strong>Benefits:</strong> ${job.benefits.join(', ')}</div>
    <button class="apply-btn" onclick="openApplyModal('${job.title}')">Apply</button>
  `;
  jobList.appendChild(card);
});

// Modal interaction
const applyModal = document.getElementById('applyModal');
const closeModalBtn = document.getElementById('closeModal');
const applyForm = document.getElementById('applyForm');
const confirmation = document.getElementById('confirmation');
const jobTitleInput = document.getElementById('jobTitle');
const jobInModal = document.getElementById('jobInModal');

window.openApplyModal = function(title) {
  jobTitleInput.value = title;
  jobInModal.innerText = title;
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

applyForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const cover = document.getElementById('cover').value.trim();
  // Simple file check (not real upload)
  const resumeInput = document.getElementById('resume');
  const resume = resumeInput.files[0];
  if (!name || !email || !phone ) {
    confirmation.style.color = "red";
    confirmation.innerText = "Please fill all the required fields.";
    return;
  }
  if(resume && resume.type !== "application/pdf") {
    confirmation.style.color = "red";
    confirmation.innerText = "Resume must be a PDF file.";
    resumeInput.value = "";
    return;
  }
  confirmation.style.color = "green";
  confirmation.innerText = `Thank you, ${name}! Your application for "${jobTitleInput.value}" has been submitted. We'll contact you soon.`;
  applyForm.reset();
};
