// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" },
  );
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .service-card",
);
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.style.width = "50px";
    cursorOutline.style.height = "50px";
    cursorOutline.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
  });
  el.addEventListener("mouseleave", () => {
    cursorOutline.style.width = "30px";
    cursorOutline.style.height = "30px";
    cursorOutline.style.backgroundColor = "transparent";
  });
});

// Navigation Show on Scroll
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.remove("opacity-0", "-translate-y-full");
    navbar.classList.add("opacity-100", "translate-y-0");
  } else {
    navbar.classList.add("opacity-0", "-translate-y-full");
    navbar.classList.remove("opacity-100", "translate-y-0");
  }

  lastScroll = currentScroll;
});

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });
});

// Hero Animations
gsap.from("#hero-title-1", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  delay: 0.2,
});

gsap.from("#hero-title-2", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  delay: 0.4,
});

gsap.from("#hero-subtitle", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.6,
});

gsap.from("#hero-cta", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.8,
});

gsap.from("#hero-stats > div", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
  delay: 1,
  onComplete: animateCounters,
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `${target}+`;
      }
    };

    updateCounter();
  });
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(
  ".glass, .project-card, .service-card",
);
revealElements.forEach((el, index) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: (index % 3) * 0.1,
  });
});

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll(".magnetic-btn");
magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const track = document.getElementById("projects-track");
const leftBtn = document.getElementById("scroll-left");
const rightBtn = document.getElementById("scroll-right");
const indicators = document.querySelectorAll("#scroll-indicators div");
const cards = track.querySelectorAll(".project-card-horizontal");

const getCardScrollAmount = () => {
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  return cards[0]?.getBoundingClientRect().width + gap;
};

const updateScrollIndicators = () => {
  const scrollLeft = track.scrollLeft;
  const maxScroll = track.scrollWidth - track.clientWidth;
  const trackCenter = scrollLeft + track.clientWidth / 2;

  let activeIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(trackCenter - cardCenter);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("bg-primary", index === activeIndex);
    indicator.classList.toggle("bg-white/20", index !== activeIndex);
  });

  leftBtn.style.opacity = scrollLeft > 50 ? "1" : "0.3";
  rightBtn.style.opacity = scrollLeft < maxScroll - 50 ? "1" : "0.3";
};

leftBtn.addEventListener("click", () => {
  track.scrollBy({ left: -getCardScrollAmount(), behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  track.scrollBy({ left: getCardScrollAmount(), behavior: "smooth" });
});

track.addEventListener("scroll", updateScrollIndicators);
window.addEventListener("resize", updateScrollIndicators);

updateScrollIndicators();
