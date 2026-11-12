const menuButton = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector("#primary-navigation");

if (!menuButton || !navigationMenu) {
  throw new Error("Navigation menu button or menu was not found.");
}

document.documentElement.classList.add("has-js");

function setMenuOpen(isOpen) {
  navigationMenu.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

menuButton.addEventListener("click", function () {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navigationMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenuOpen(false);
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
