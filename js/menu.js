const toggle_menu__icon = document.getElementById("toggle-menu");
const main_menu__icon = document.getElementById("main-menu");

toggle_menu__icon.addEventListener("click", () => {
  main_menu__icon.classList.toggle("main-menu__show");
});
