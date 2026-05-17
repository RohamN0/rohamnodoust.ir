(function() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (!href.startsWith("#")) return;

        e.preventDefault();

        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        this.classList.remove("clicked");
        void this.offsetWidth; // force reflow
        this.classList.add("clicked");

        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
})();
