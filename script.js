document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const backTop = document.querySelector(".back-top");

  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const form = document.getElementById("enquiryForm");

  if (form) {
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();

        if (message) {
          message.textContent = "Please complete all required fields correctly.";
          message.className = "form-message error";
        }
        return;
      }

      if (message) {
        message.textContent =
          "Your enquiry has been validated locally. No message was sent because this website has no backend configured.";
        message.className = "form-message success";
      }

      form.reset();
    });
  }

  document.querySelectorAll("details.faq").forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        document.querySelectorAll("details.faq[open]").forEach(other => {
          if (other !== item) other.removeAttribute("open");
        });
      }
    });
  });
});
