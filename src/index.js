import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { closeModal, openFullScreen, openModal } from "./components/modal.js";
import {
  popupTypeImage,
  popupImage,
  popupCaption,
} from "./components/modal.js";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
import { isValid } from "./components/validation.js";
import {formSelector, inputSelector, inputErrorClass} from "./components/validation.js";

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

const regex = /[a-zа-яё\-\s]/gi; // Регулярное выражение для проверки формы

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
const form = document.querySelector('[name="edit-profile"]'); //Обращаемся к форме редактирования профиля
const name = form.elements.name; //Обращаемся к элементу формы имя
const description = form.elements.description; //Обращаемся к элементу формы занятие

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  name.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  description.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
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

// Находим поля формы в DOM
const formElement = form;
const nameInput = formElement.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.description; // Воспользуйтесь инструментом .querySelector()

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //Присваиваем значение элементу формы имя
  profileDescription.textContent = jobInput.value; //Присваиваем значение элементу формы занятие
  closeModal(popupTypeEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

const formCard = document.querySelector('[name="new-place"]'); // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
const nameCardInput = formCard.querySelector('[name="place-name"]'); // Воспользуйтесь инструментом .querySelector()
const linkCardInput = formCard.link; // Воспользуйтесь инструментом .querySelector()

function formSubmit(evt) {
  evt.preventDefault();

  const newCard = addCard(
    nameCardInput.value,
    linkCardInput.value,
    deleteCard,
    openFullScreen,
    likeCard
  );
  //Создание новой карточки
  placesList.prepend(newCard); //Вставляем новyю карточку в начало контейнера
  formCard.reset(); //Очищаем поля формы
  closeModal(popupTypeNewCard);
}

formCard.addEventListener("submit", formSubmit);



// Слушатель события input
inputSelector.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода, 
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
}); 

 // Вызовем функцию isValid на каждый ввод символа
 inputSelector.addEventListener('input', isValid); 