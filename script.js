// Mobile nav toggle removed (hamburger/menu not used)
const navlinks = document.getElementById("navlinks");
const mobileToggle = document.getElementById("mobileToggle");

function setMobileMenu(open) {
  if (!navlinks || !mobileToggle) return;
  navlinks.classList.toggle("open", open);
  mobileToggle.classList.toggle("is-open", open);
  mobileToggle.setAttribute("aria-expanded", String(open));
}

if (mobileToggle && navlinks) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = navlinks.classList.contains("open");
    setMobileMenu(!isOpen);
  });

  // Close menu when a normal link is clicked (mobile UX)
  navlinks.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (window.matchMedia("(max-width: 680px)").matches) {
      setMobileMenu(false);
    }
  });

  // If user resizes up, ensure menu closes
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 680px)").matches) {
      setMobileMenu(false);
    }
  });
}


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
  if (e.key === "Escape") {
    closeAllDropdowns();
    setMobileMenu(false);
  }
});
// Footer year (if you want it, but the HTML already has it)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu panel logic removed (no mobile menu present)

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}