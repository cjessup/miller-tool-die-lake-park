(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  var filters = document.querySelector(".filters");
  if (filters) {
    var buttons = filters.querySelectorAll("button");
    var panels = document.querySelectorAll(".equip-panel");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-cat");
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        panels.forEach(function (panel) {
          var show = id === "all" || panel.getAttribute("data-cat") === id;
          if (show) {
            panel.hidden = false;
            panel.style.animation = "none";
            void panel.offsetWidth;
            panel.style.animation = "";
          } else {
            panel.hidden = true;
          }
        });
      });
    });
  }

  var shots = document.querySelectorAll(".shot");
  if (shots.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.innerHTML = '<button class="lb-close" type="button">Close</button><img alt=""><p class="lb-cap"></p>';
    document.body.appendChild(box);
    var img = box.querySelector("img");
    var cap = box.querySelector(".lb-cap");
    var closeBtn = box.querySelector(".lb-close");

    function closeBox() {
      box.classList.remove("is-on");
      img.classList.remove("shown");
      box.hidden = true;
    }

    function openBox(shot) {
      var source = shot.querySelector("img");
      img.classList.remove("shown");
      img.alt = source.alt;
      img.src = source.src;
      cap.textContent = shot.getAttribute("data-caption") || "";
      box.hidden = false;
      requestAnimationFrame(function () {
        box.classList.add("is-on");
        requestAnimationFrame(function () { img.classList.add("shown"); });
      });
      closeBtn.focus();
    }

    shots.forEach(function (shot) {
      shot.addEventListener("click", function () { openBox(shot); });
    });
    closeBtn.addEventListener("click", closeBox);
    box.addEventListener("click", function (e) {
      if (e.target === box) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) closeBox();
    });
  }

  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var result = document.getElementById("form-result");
      if (result) result.classList.add("show");
      form.reset();
    });
  }
})();
