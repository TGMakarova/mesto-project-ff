import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { closeModal, openFullScreen, openModal } from "./components/modal.js";
import {
  popupTypeImage,
  popupImage,
  popupCaption,
} from "./components/modal.js";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
//import {handleFormSubmit} from "./components/submit.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list"); //Перечень карточек
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирования профиля
const profileAddButton = document.querySelector(".profile__add-button"); //Кнопка добавления карточки
const popupTypeEdit = document.querySelector(".popup_type_edit"); //Редактирование попапа
const popupTypeEditClose = popupTypeEdit.querySelector(".popup__close"); //Закрытие попапа редактирования профиля
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // Редактирование новой карточки попапа
const popupTypeNewCardClose = popupTypeNewCard.querySelector(".popup__close"); //Закрытие попапа редактирования новой карточки
const popupTypeImageClose = document.querySelector(
  ".popup_type_image .popup__close"
); //Закрытите попапа по изображению

// Заполняем начальными карточками
initialCards.forEach((item) =>
  placesList.append(
    addCard(item.name, item.link, deleteCard, openFullScreen, likeCard)
  )
);

// В popup формы редактирования профиля вносим первоначальные значения
//Сначала
const profileInfo = document.querySelector(".profile__info"); // Находим форму в DOM
const profileTitle = profileInfo.querySelector(".profile__title"); // Находим поле имени формы в DOM
const profileDescription = profileInfo.querySelector(".profile__description"); //Находим поле занятия в DOM

//Затем
const form = document.forms[0]; //Обращаемся к форме редактирования профиля
const name = form.elements.name; //Обращаемся к элементу формы имя
const description = form.elements.description; //Обращаемся к элементу формы занятие

name.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
description.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
});

popupTypeEditClose.addEventListener("click", () => {
  closeModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

popupTypeNewCardClose.addEventListener("click", () => {
  closeModal(popupTypeNewCard);
});

popupTypeImageClose.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

const formElement = document.forms[0]; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.description; // Воспользуйтесь инструментом .querySelector()

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //Присваиваем значение элементу формы имя
  profileDescription.textContent = jobInput.value; //Присваиваем значение элементу формы занятие
  closeModal(popupTypeEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

const formCard = document.forms[1]; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameCardInput = document.querySelector('[name="place-name"]'); // Воспользуйтесь инструментом .querySelector()
const linkCardInput = formCard.link; // Воспользуйтесь инструментом .querySelector()

function formSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameCardInput.value;
  const nameLink = linkCardInput.value;
  const newCard = addCard(
    nameValue,
    nameLink,
    deleteCard,
    openFullScreen,
    likeCard
  ); //Создание новой карточки
  placesList.prepend(newCard); //Вставляем новyю карточку в начало контейнера
  formCard.reset(); //Очищаем поля формы
  closeModal(popupTypeNewCard);
}

formCard.addEventListener("submit", formSubmit);
