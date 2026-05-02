(function () {
  "use strict";

  // Mobile nav toggle
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close when clicking a link (mobile)
    nav.querySelectorAll(".nav__list a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (nav.classList.contains("nav--open")) {
          nav.classList.remove("nav--open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Set current year in footer
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
