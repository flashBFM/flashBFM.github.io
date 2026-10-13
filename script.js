(function () {
  "use strict";

  var header = document.querySelector(".header");
  var menuButton = document.querySelector("[data-menu-button]");
  var menu = document.querySelector("#menu");
  var year = document.querySelector("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var onScroll = function () {
    if (window.scrollY > 8) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (target, index) {
      target.style.transitionDelay = (index % 3) * 70 + "ms";
      observer.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add("visible");
    });
  }
})();
