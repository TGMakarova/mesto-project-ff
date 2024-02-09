import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
import { closeModal, openFullScreen, openModal } from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation} from "./components/validation.js";
//import {formSelector, inputSelector, inputErrorClass} from "./components/validation.js";
import { placesList, profileEditButton, profileAddButton, popupTypeEdit, popupTypeEditClose } from "./components/constants.js";
import { popupTypeNewCard, popupTypeNewCardClose, popupTypeImageClose}from "./components/constants.js";
import {profileInfo, profileTitle, profileDescription} from "./components/constants.js";
import { popupTypeImage, popupImage, popupCaption } from "./components/constants.js";




// Первоначальное заполнение карточек из массива
initialCards.forEach((item) =>
  placesList.append(
    addCard(item.name, item.link, deleteCard, openFullScreen, likeCard)
  )
);

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

//Первоначальное заполнение данными профиля: имя и знятие
const form = document.querySelector('[name="edit-profile"]'); //Обращаемся к форме редактирования профиля
const name = form.elements.name; //Обращаемся к элементу формы имя
const description = form.elements.description; //Обращаемся к элементу формы занятие

profileEditButton.addEventListener("click", () => {
  clearValidation(formElement, validationConfig);
  openModal(popupTypeEdit);
  name.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  description.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
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

// Вызовем функцию
enableValidation(validationConfig); 

fetch('https://nomoreparties.co/v1/wff-cohort-5/cards', {
  headers: {
    authorization: '6273fa6e-eb51-4455-bd96-4d161b401fc0'
  },
  method:'GET'
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  

  