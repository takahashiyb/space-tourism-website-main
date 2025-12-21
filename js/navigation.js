export function functionHamburger() {
  const dialog = document.querySelector(".js-dialog");

  const buttonClose = document.querySelector(".js-button_close");

  const buttonHamburger = document.querySelector(".header__menu");

  buttonHamburger.addEventListener("click", () => {
    dialog.showModal();
  });

  buttonClose.addEventListener("click", () => {
    dialog.close();
  });

  const media = window.matchMedia("(min-width: 43.75em)");

  media.addEventListener("change", () => {
    dialog.close();
  });
}
