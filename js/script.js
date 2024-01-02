// Navbar Toggle Button in Responsive Design
function setupToggleNavigation() {
  const toggleBtn = document.querySelector(".toggle-btn");
  const navigation = document.querySelector(".navigation");
  const overlay = document.querySelector(".overlay");

  function toggleNavigation() {
    navigation.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  function closeNavigation() {
    navigation.classList.remove("active");
    overlay.classList.remove("active");
  }

  toggleBtn.addEventListener("click", toggleNavigation);
  overlay.addEventListener("click", closeNavigation);
}

// Call the function to set up toggle navigation
setupToggleNavigation();

// Function to handle the intersection of sections
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the "active" class when the section is in view
      entry.target.classList.add("active");

      // Execute a callback function when a section becomes active
      if (entry.target.dataset.onSectionActive) {
        const callback = window[entry.target.dataset.onSectionActive];
        if (typeof callback === "function") {
          callback(entry.target);
        }
      }

      // Stop observing the section once it becomes active
      observer.unobserve(entry.target);
    }
  });
};

// Create an observer with the handleIntersection callback
const observer = new IntersectionObserver(handleIntersection);

// Target the sections you want to observe
const sections = document.querySelectorAll("section .container");

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

// Main Info: Auto Type
document.addEventListener("DOMContentLoaded", function () {
  let typed = new Typed(".auto-type", {
    strings: ["Frontend Developer", "UI/UX Designer"],
    typeSpeed: 50,
    backSpeed: 100,
    loop: true,
  });
});

// Projects Section
async function fetchProjcts() {
  try {
    const response = await fetch("/api/projects-api.json");
    const projects = await response.json();
    const projectContainer = document.getElementById("project-container");
    const projectsHTML = projects
      .map(
        (project) =>
          `
    <div class="project-card">
    <div class="project-image">
      <img src="${project.image}" />
      <a
        href="${project.demo}"
        class="demo-button"
        target="_blank"
        >View Demo</a
      >
    </div>
    <div class="project-info">
      <p class="project-desc">
        ${project.description}
      </p>
      <div class="project-title">
        <h4>${project.title}</h4>
        <a
          href="${project.repo}"
          class="source-code"
          target="_blank"
          ><i class="fab fa-github"></i
        ></a>
      </div>
    </div>
  </div>
    `
      )
      .join("");

    projectContainer.innerHTML = projectsHTML;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

fetchProjcts();

// Contact Form: Validation Form
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "email is required";
    isValid = false;
  } else if (email === "" || !/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = "Valid email is required";
    isValid = false;
  }

  if (message === "") {
    messageError.textContent = "Message is required";
    isValid = false;
  }

  return isValid;
}

// Footer: (Dynamic Year)
document.querySelector(".currentYear").innerHTML = new Date().getFullYear();
