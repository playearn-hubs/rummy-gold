import { SITE } from "./site-config.js";
import { initLiveTicker } from "./ticker.js";

const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
const siteHeader = document.querySelector(".site-header");
const yearEl = document.getElementById("year");
const MOBILE_BREAKPOINT = 768;

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

initLiveTicker();

function setMobileNavOpen(open) {
  if (!navToggle || !mobileNav) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.setAttribute("aria-hidden", String(!open));
  mobileNav.classList.toggle("is-open", open);
  siteHeader?.classList.toggle("nav-open", open);
  document.body.classList.toggle("nav-open", open);
}

function closeMobileNav() {
  setMobileNavOpen(false);
}

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    setMobileNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) closeMobileNav();
  });
}

function handleDownloadClick(event) {
  if (event) event.preventDefault();
  const url = SITE.downloadUrl;
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  const target = document.getElementById("download") || document.getElementById("main-download");
  target?.scrollIntoView({ behavior: "smooth" });
}

function handlePlayClick(event) {
  if (event) event.preventDefault();
  const url = SITE.playUrl;
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  handleDownloadClick();
}

document.querySelectorAll("[data-download]").forEach((el) => {
  el.addEventListener("click", handleDownloadClick);
});

document.querySelectorAll("[data-play]").forEach((el) => {
  el.addEventListener("click", handlePlayClick);
});
