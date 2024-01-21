const popup = document.querySelector(".popup");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupImage = popupTypeImage.querySelector(".popup__image");
export const popupCaption = popupTypeImage.querySelector(".popup__caption");

//Создание функции выхода по Escape

function closeEscape(evt) {
  if (evt.code === "Escape") {
    let popupOpened;
    if (document.querySelector(".popup_is-opened")) {
      popupOpened = document.querySelector(".popup_is-opened");
    }

    if (popupOpened) {
      closeModal(popupOpened);
      document.removeEventListener("click", closeEscape);
    }
  }
}

//Создание функции выхода по Overlay
function closeOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

//Создание функции открытия модального окна

export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", closeEscape);
  document.addEventListener("click", closeOverlay);
}

//Создание функции закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
  document.removeEventListener("click", closeOverlay);
}

export function openFullScreen(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}
