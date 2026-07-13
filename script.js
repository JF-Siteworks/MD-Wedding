
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const hamburgerSpan = document.querySelector(".hamburger span");
const navRigh = document.querySelector(".nav-right");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    navbar.classList.add("scrolled");
    hamburger.classList.add("scrolled");
    hamburgerSpan.classList.add("scrolled");
    navRigh.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled");
    hamburger.classList.remove("scrolled");
    hamburgerSpan.classList.remove("scrolled");
    navRigh.classList.remove("scrolled")
  }
});

const button = document.querySelector(".button");
const text = document.querySelector(".button-text");
const buttonSpan = button.querySelector(".button span");
const hero = document.querySelector("#hero");

window.addEventListener("scroll", () => {
  const heroRect = hero.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  if (heroRect.bottom <= buttonRect.top) {
    button.classList.add("scrolled");
    text.classList.add("scrolled");
    if (buttonSpan) buttonSpan.classList.add("scrolled");
  } else {
    button.classList.remove("scrolled");
    text.classList.remove("scrolled");
    if (buttonSpan) buttonSpan.classList.remove("scrolled");
  }
});


// Hamburger mobile menu toggle
const navRight = document.querySelector('.nav-right');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navRight.classList.toggle('mobile-nav-active');
    hamburger.classList.toggle('open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      // Special scroll for RSVP link to position form 5px below navbar
      if (this.getAttribute("href") === "#rsvp") {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetTop - navbarHeight - 5,
          behavior: "smooth",
        });
      } else {
        const offset = window.innerHeight / 2 - target.offsetHeight / 2;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: "smooth",
        });
      }
      // Hide mobile menu after click
      if (window.innerWidth <= 768 && navRight.classList.contains('mobile-nav-active')) {
        navRight.classList.remove('mobile-nav-active');
        hamburger.classList.remove('open');
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");
  const button = document.getElementById("rsvp-button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default form submit
    button.textContent = "Submitting...";

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      if (!response.ok) throw new Error("Network error");

      const result = await response.json();

      if (result.status === "success") {
        button.textContent = "RSVP submitted!";
        button.disabled = true;
        form.reset();
        setTimeout(() => {
          button.textContent = "Send RSVP";
          button.disabled = false;
        }, 5000);
      } else {
        alert("Error: " + result.message);
        button.textContent = "Send RSVP";
      }
    } catch (err) {
      alert("Failed to submit RSVP. Try again.\n" + err);
      button.textContent = "Send RSVP";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");
  const button = document.getElementById("rsvp-button");

  // safety check
  if (!form || !button) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.textContent = "Submitting...";
    button.disabled = true;

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === "success") {
        button.textContent = "RSVP submitted!";
        form.reset();

        setTimeout(() => {
          button.textContent = "Send RSVP";
          button.disabled = false;
        }, 5000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      alert("Failed to submit RSVP. Please try again.");
      console.error(err);
      button.textContent = "Send RSVP";
      button.disabled = false;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("food-form");
  const button = document.getElementById("food-button");

  if (!form || !button) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default form submit
    button.textContent = "Submitting...";

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      if (!response.ok) throw new Error("Network error");

      const result = await response.json();

      if (result.status === "success") {
        button.textContent = "Menu submitted!";
        button.disabled = true;
        form.reset();

        setTimeout(() => {
          button.textContent = "Submit Menu Choice";
          button.disabled = false;
        }, 5000);
      } else {
        alert("Error: " + result.message);
        button.textContent = "Submit Menu Choice";
      }
    } catch (err) {
      alert("Failed to submit menu choice. Try again.\n" + err);
      button.textContent = "Submit Menu Choice";
    }
  });
});

