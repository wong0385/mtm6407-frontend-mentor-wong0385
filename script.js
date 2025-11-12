// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const navWrapper = document.querySelector(".nav-wrapper");
const navOverlay = document.querySelector(".nav-overlay");
const body = document.body;

// Function to open mobile menu
function openMobileMenu() {
  navWrapper.classList.add("active");
  navOverlay.classList.add("active");
  body.style.overflow = "hidden";
}

// Function to close mobile menu
function closeMobileMenu() {
  navWrapper.classList.remove("active");
  navOverlay.classList.remove("active");
  body.style.overflow = "";

  // Close all dropdowns when closing mobile menu
  const activeDropdowns = document.querySelectorAll(".has-dropdown.active");
  activeDropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");
  });
}

// Event listeners for mobile menu
if (menuToggle) {
  menuToggle.addEventListener("click", openMobileMenu);
}

if (menuClose) {
  menuClose.addEventListener("click", closeMobileMenu);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeMobileMenu);
}

// Dropdown Toggle Functionality
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const parentItem = this.closest(".has-dropdown");
    const isActive = parentItem.classList.contains("active");

    // Close all other dropdowns
    document.querySelectorAll(".has-dropdown").forEach((item) => {
      if (item !== parentItem) {
        item.classList.remove("active");
      }
    });

    // Toggle current dropdown
    if (isActive) {
      parentItem.classList.remove("active");
    } else {
      parentItem.classList.add("active");
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".has-dropdown")) {
    document.querySelectorAll(".has-dropdown").forEach((item) => {
      item.classList.remove("active");
    });
  }
});

// Handle window resize - close mobile menu if opened
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 250);
});

// Prevent body scroll when mobile menu is open
window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && body.style.overflow === "hidden") {
    body.style.overflow = "";
  }
});

// Keyboard accessibility
document.addEventListener("keydown", function (e) {
  // Close mobile menu on Escape key
  if (e.key === "Escape") {
    if (navWrapper.classList.contains("active")) {
      closeMobileMenu();
    } else {
      // Close all dropdowns on desktop
      document.querySelectorAll(".has-dropdown").forEach((item) => {
        item.classList.remove("active");
      });
    }
  }
});

// Add keyboard navigation for dropdowns
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
});
