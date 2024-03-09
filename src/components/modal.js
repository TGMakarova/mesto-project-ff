//Создание функции выхода по Escape
function closeEscape(evt) {
  if (evt.code === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");

    if (popupOpened) {
      closeModal(popupOpened);
      document.removeEventListener("click", closeEscape);
    }
  }
}

//Создание функции выхода по Overlay
export function closeOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

//Создание функции открытия модального окна

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
}

//Создание функции закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
}
