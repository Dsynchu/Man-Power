// script-upgraded.js - Enhanced Job Portal JavaScript

// Job data with additional properties
const jobs = [
  {
    id: 1,
    title: "Sales Executive",
    location: "Mumbai",
    salary: "₹25,000 – ₹40,000/month",
    exp: "1+ years (Freshers Welcome)",
    expLevel: "fresher",
    description: "Seeking energetic candidates for sales and marketing roles. Strong communication skills and a passion for customer relations required.",
    skills: ["Sales", "Marketing", "CRM", "Fieldwork"],
    benefits: ["Incentives & Bonuses", "Corporate Training", "Travel Allowance"],
    featured: true,
    postedDate: "2025-08-15"
  },
  {
    id: 2,
    title: "Senior Accountant",
    location: "Delhi",
    salary: "₹38,000 – ₹55,000/month",
    exp: "Min 3 years",
    expLevel: "3+",
    description: "Manage accounts, prepare financial reports and analyze budgets. Experience with Tally and GST mandatory.",
    skills: ["Tally", "GST", "Excel", "Financial Reporting"],
    benefits: ["Health Insurance", "Professional Development", "Performance Bonus"],
    featured: false,
    postedDate: "2025-08-14"
  },
  {
    id: 3,
    title: "Site Supervisor",
    location: "Pune",
    salary: "₹22,000 – ₹35,000/month",
    exp: "2+ years",
    expLevel: "1-3",
    description: "Supervise onsite teams, manage work schedules, and ensure safety compliance at all times.",
    skills: ["Team Management", "Safety Compliance", "Project Planning"],
    benefits: ["PF & ESI", "Travel Allowance", "Safety Trainings"],
    featured: false,
    postedDate: "2025-08-13"
  },
  {
    id: 4,
    title: "Java Software Developer",
    location: "Bangalore",
    salary: "₹42,000 – ₹65,000/month",
    exp: "2+ years",
    expLevel: "1-3",
    description: "Design, build and maintain scalable Java applications. Familiarity with Spring and REST APIs necessary.",
    skills: ["Java", "Spring", "REST APIs", "MySQL"],
    benefits: ["WFH Option", "Stock Options", "Tech Conferences"],
    featured: true,
    postedDate: "2025-08-16"
  },
  {
    id: 5,
    title: "Digital Marketing Specialist",
    location: "Mumbai",
    salary: "₹30,000 – ₹50,000/month",
    exp: "2+ years",
    expLevel: "1-3",
    description: "Drive digital marketing campaigns, manage social media presence, and analyze marketing metrics for business growth.",
    skills: ["SEO", "Social Media", "Google Ads", "Analytics"],
    benefits: ["Flexible Hours", "Learning Budget", "Health Insurance"],
    featured: false,
    postedDate: "2025-08-12"
  },
  {
    id: 6,
    title: "UI/UX Designer",
    location: "Bangalore",
    salary: "₹35,000 – ₹60,000/month",
    exp: "1+ years (Portfolio Required)",
    expLevel: "fresher",
    description: "Create intuitive user interfaces and engaging user experiences for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    benefits: ["Creative Environment", "Latest Tools", "Design Conferences"],
    featured: true,
    postedDate: "2025-08-17"
  }
];

// DOM elements
const jobList = document.getElementById('jobList');
const jobSearch = document.getElementById('jobSearch');
const locationFilter = document.getElementById('locationFilter');
const experienceFilter = document.getElementById('experienceFilter');
const clearFilters = document.getElementById('clearFilters');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const applicationModal = document.getElementById('applicationModal');
const closeModalBtn = document.querySelector('.close');
const applyForm = document.getElementById('applyForm');
const modalJobTitle = document.getElementById('modalJobTitle');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');

// State management
let filteredJobs = [...jobs];
let currentJobId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  renderJobs(jobs);
  setupEventListeners();
  setupFAQ();
  setupScrollToTop();
  populateFilterOptions();
});

// Theme management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    updateThemeToggleIcon();
  }
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const icon = themeToggle.querySelector('i');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Job rendering
function renderJobs(jobsToRender) {
  filteredJobs = jobsToRender;
  
  // Update results count
  updateResultsCount();
  
  // Show/hide no results message
  if (jobsToRender.length === 0) {
    jobList.style.display = 'none';
    noResults.style.display = 'block';
    return;
  } else {
    jobList.style.display = 'grid';
    noResults.style.display = 'none';
  }
  
  // Clear and populate job list
  jobList.innerHTML = '';
  
  jobsToRender.forEach((job, index) => {
    const card = createJobCard(job, index);
    jobList.appendChild(card);
  });
  
  // Add stagger animation
  animateJobCards();
}

function createJobCard(job, index) {
  const card = document.createElement('div');
  card.className = 'job-card';
  card.setAttribute('data-job-id', job.id);
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  const daysAgo = getDaysAgo(job.postedDate);
  const featuredBadge = job.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : '';
  
  card.innerHTML = `
    ${featuredBadge}
    <div class="job-header">
      <h3>${job.title}</h3>
      <div class="job-meta">
        <span class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
        <span class="posted-date"><i class="far fa-clock"></i> ${daysAgo}</span>
      </div>
    </div>
    
    <div class="job-details">
      <div class="salary"><i class="fas fa-rupee-sign"></i> <strong>Salary:</strong> ${job.salary}</div>
      <div class="exp"><i class="fas fa-briefcase"></i> <strong>Experience:</strong> ${job.exp}</div>
      <div class="description">${job.description}</div>
    </div>
    
    <div class="skills-section">
      <strong><i class="fas fa-tools"></i> Skills:</strong>
      <ul class="skills-list">
        ${job.skills.map(skill => `<li><i class="fas fa-check"></i> ${skill}</li>`).join('')}
      </ul>
    </div>
    
    <div class="benefits-section">
      <strong><i class="fas fa-gift"></i> Benefits:</strong>
      <div class="benefits-list">
        ${job.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
      </div>
    </div>
    
    <button class="apply-btn" data-job-id="${job.id}">
      <i class="fas fa-paper-plane"></i>
      Apply Now
    </button>
  `;
  
  return card;
}

function animateJobCards() {
  const cards = document.querySelectorAll('.job-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Utility functions
function getDaysAgo(dateString) {
  const posted = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - posted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}

function updateResultsCount() {
  const count = filteredJobs.length;
  const total = jobs.length;
  resultsCount.textContent = `Showing ${count} of ${total} job${count !== 1 ? 's' : ''}`;
}

// Filter functionality
function populateFilterOptions() {
  // Populate location filter
  const locations = [...new Set(jobs.map(job => job.location))].sort();
  locationFilter.innerHTML = '<option value="">All Locations</option>';
  locations.forEach(location => {
    locationFilter.innerHTML += `<option value="${location}">${location}</option>`;
  });
}

function applyFilters() {
  const searchTerm = jobSearch.value.toLowerCase().trim();
  const selectedLocation = locationFilter.value;
  const selectedExperience = experienceFilter.value;
  
  let filtered = jobs.filter(job => {
    // Search filter
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
    
    // Location filter
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    
    // Experience filter
    const matchesExperience = !selectedExperience || job.expLevel === selectedExperience;
    
    return matchesSearch && matchesLocation && matchesExperience;
  });
  
  renderJobs(filtered);
}

function clearAllFilters() {
  jobSearch.value = '';
  locationFilter.value = '';
  experienceFilter.value = '';
  renderJobs(jobs);
  
  // Add visual feedback
  clearFilters.innerHTML = '<i class="fas fa-check"></i> Cleared';
  setTimeout(() => {
    clearFilters.innerHTML = '<i class="fas fa-times"></i> Clear';
  }, 1500);
}

// Modal functionality
function openModal(jobId) {
  currentJobId = jobId;
  const job = jobs.find(j => j.id === jobId);
  
  if (job) {
    modalJobTitle.textContent = job.title;
    applicationModal.classList.add('show');
    applicationModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
      const firstInput = applyForm.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeModal() {
  applicationModal.classList.remove('show');
  setTimeout(() => {
    applicationModal.style.display = 'none';
    document.body.style.overflow = '';
    resetForm();
  }, 300);
}

function resetForm() {
  applyForm.reset();
  clearFormErrors();
  updateFormStatus('', '');
  
  const submitBtn = applyForm.querySelector('.submit-btn');
  submitBtn.disabled = false;
  submitBtn.querySelector('.btn-text').textContent = 'Submit Application';
  submitBtn.querySelector('.spinner').style.display = 'none';
}

// Form validation and submission
function validateForm() {
  const formData = new FormData(applyForm);
  const errors = {};
  
  // Name validation
  const name = formData.get('name')?.trim();
  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  const email = formData.get('email')?.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  const phone = formData.get('phone')?.trim();
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Resume validation
  const resume = formData.get('resume');
  if (!resume || !resume.size) {
    errors.resume = 'Resume is required';
  } else if (resume.type !== 'application/pdf') {
    errors.resume = 'Resume must be a PDF file';
  } else if (resume.size > 5 * 1024 * 1024) { // 5MB limit
    errors.resume = 'Resume file size must be less than 5MB';
  }
  
  return errors;
}

function displayFormErrors(errors) {
  clearFormErrors();
  
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(`applicant${field.charAt(0).toUpperCase() + field.slice(1)}`) || 
                        document.getElementById(`applicant${field.charAt(0).toUpperCase() + field.slice(1).replace('ame', 'Name')}`);
    
    if (errorElement) {
      errorElement.textContent = errors[field];
      errorElement.style.display = 'block';
    }
    
    if (inputElement) {
      inputElement.style.borderColor = '#ff4757';
    }
  });
}

function clearFormErrors() {
  const errorElements = applyForm.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
    element.style.display = 'none';
  });
  
  const inputElements = applyForm.querySelectorAll('input, textarea, select');
  inputElements.forEach(element => {
    element.style.borderColor = '';
  });
}

function updateFormStatus(message, type) {
  const statusElement = document.getElementById('formStatus');
  statusElement.textContent = message;
  statusElement.className = `form-status ${type}`;
}

async function submitApplication(formData) {
  const submitBtn = applyForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.spinner');
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = 'Submitting...';
  spinner.style.display = 'inline-block';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const job = jobs.find(j => j.id === currentJobId);
    const applicantName = formData.get('name');
    
    updateFormStatus(
      `Thank you, ${applicantName}! Your application for "${job.title}" has been submitted successfully. We'll contact you within 2-3 business days.`,
      'success'
    );
    
    // Reset button state
    btnText.textContent = 'Application Submitted';
    spinner.style.display = 'none';
    
    // Auto-close modal after success
    setTimeout(() => {
      closeModal();
    }, 3000);
    
  } catch (error) {
    updateFormStatus('Something went wrong. Please try again later.', 'error');
    
    // Reset button state
    submitBtn.disabled = false;
    btnText.textContent = 'Submit Application';
    spinner.style.display = 'none';
  }
}

// FAQ functionality
function setupFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Open current item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Scroll to top functionality
function setupScrollToTop() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'block';
      backToTop.style.opacity = '1';
    } else {
      backToTop.style.opacity = '0';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTop.style.display = 'none';
        }
      }, 300);
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Event listeners setup
function setupEventListeners() {
  // Search and filter events
  jobSearch.addEventListener('input', debounce(applyFilters, 300));
  locationFilter.addEventListener('change', applyFilters);
  experienceFilter.addEventListener('change', applyFilters);
  clearFilters.addEventListener('click', clearAllFilters);
  
  // Modal events
  jobList.addEventListener('click', (e) => {
    if (e.target.matches('.apply-btn') || e.target.closest('.apply-btn')) {
      const jobId = parseInt(e.target.dataset.jobId || e.target.closest('.apply-btn').dataset.jobId);
      openModal(jobId);
    }
  });
  
  closeModalBtn.addEventListener('click', closeModal);
  
  applicationModal.addEventListener('click', (e) => {
    if (e.target === applicationModal) {
      closeModal();
    }
  });
  
  // Form submission
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      displayFormErrors(errors);
      updateFormStatus('Please fix the errors above', 'error');
      return;
    }
    
    const formData = new FormData(applyForm);
    await submitApplication(formData);
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && applicationModal.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Form input events for better UX
  const inputs = applyForm.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
      if (!input.value.trim() && input.hasAttribute('required')) {
        input.style.borderColor = '#ff4757';
      } else {
        input.style.borderColor = '';
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.style.borderColor = 'var(--primary-color)';
      }
    });
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
function observeJobCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.job-card').forEach(card => {
    observer.observe(card);
  });
}

// Add some additional enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Add loading states
  document.body.classList.add('loaded');
  
  // Initialize tooltips (if needed)
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
  
  // Add keyboard navigation for job cards
  const jobCards = document.querySelectorAll('.job-card');
  jobCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const applyBtn = card.querySelector('.apply-btn');
        if (applyBtn) applyBtn.click();
      }
    });
  });
});

// Tooltip functions (basic implementation)
function showTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = e.target.dataset.tooltip;
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  
  e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
  if (e.target.tooltipElement) {
    document.body.removeChild(e.target.tooltipElement);
    delete e.target.tooltipElement;
  }
}

// Export functions for potential module use
window.JobPortal = {
  jobs,
  renderJobs,
  applyFilters,
  toggleTheme
};