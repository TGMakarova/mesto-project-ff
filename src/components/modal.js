//Создание функции выхода по Escape
function closeEscape(evt) {
  if (evt.code === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");

    if (popupOpened) {
      closeModal(popupOpened);
    }
  }
}

//Создание функции открытия модального окна

export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeEscape);
}

//Создание функции закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
}
