// Mobile nav toggle
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

hamburger.addEventListener("click", () => {
  const isOpen = navlinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Dropdown toggles (mobile + click)
const dropdowns = document.querySelectorAll("[data-dropdown]");

function closeAllDropdowns(except = null) {
  dropdowns.forEach(dd => {
    if (dd !== except) {
      dd.classList.remove("open");
      const btn = dd.querySelector(".dropbtn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
}

dropdowns.forEach(dd => {
  const btn = dd.querySelector(".dropbtn");

  // Click to toggle
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));

    // Close other dropdowns when opening one
    if (isOpen) closeAllDropdowns(dd);
  });
});

// Click outside closes dropdowns + mobile menu dropdowns
document.addEventListener("click", (e) => {
  const clickedInsideNav = e.target.closest(".navbar");
  if (!clickedInsideNav) {
    closeAllDropdowns();
  }
});

// Close dropdowns when pressing Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllDropdowns();
});

// Footer year (if you want it, but the HTML already has it)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
