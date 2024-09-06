import "./pages/index.css";
import { addCard, deleteCard } from "./components/cards.js";
import { closeModal, openModal } from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";
import {
  placesList,
  profileEditButton,
  profileAddButton,
  popupTypeEdit,
  profileImage,
} from "./components/constants.js";
import { popupTypeNewCard } from "./components/constants.js";
import { profileTitle, profileDescription } from "./components/constants.js";
import {
  popupTypeImage,
  popupImage,
  popupCaption,
} from "./components/constants.js";
import { popupTypeAvatar } from "./components/constants.js";
import {
  receiveUser,
  receiveCards,
  sendMyDatas,
  addCardServer,
  updateUserAvatar,
} from "./components/api.js";

import { validationConfig } from "./components/constants.js";

//Находим все попапы
const popups = document.querySelectorAll(".popup");

//Первоначальное заполнение данными профиля: имя и знятие
const formTypeEdit = document.forms["edit-profile"]; //Обращаемся к форме редактирования профиля
const nameTypeEdit = formTypeEdit.elements.name; //Обращаемся к элементу формы имя
const descriptionTypeEdit = formTypeEdit.elements.description; //Обращаемся к элементу формы занятие
const formTypeEditSubmit = formTypeEdit.querySelector('[type="submit"]');

// Находим форму и поля формы карточки в DOM
const formCard = document.forms["new-place"]; // Воспользуйтесь методом querySelector()
const nameCardInput = formCard.elements["place-name"]; // Воспользуйтесь инструментом .querySelector()
const linkCardInput = formCard.link; // Воспользуйтесь инструментом .querySelector()
const formCardSubmit = formCard.querySelector('[type="submit"]');

// Находим поля формы аватара в DOM
const formAvatar = document.forms["new-avatar"];
const linkAvatarInput = formAvatar.link;
const formAvatarSubmit = formAvatar.querySelector('[type="submit"]');

//Для каждого попапа создаем функцию закрытия по кнопке "крестик" и  по overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
  });
});

//Создание функции полного экрана
function openFullScreen(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

//Открытие формы профиля с предварительной валидацией
profileEditButton.addEventListener("click", () => {
  clearValidation(formTypeEdit, validationConfig);
  formTypeEditSubmit.disabled = false;
  openModal(popupTypeEdit);
  nameTypeEdit.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  descriptionTypeEdit.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
});

// Открытие формы карточки с предварительной валидацией
profileAddButton.addEventListener("click", () => {
  clearValidation(formCard, validationConfig);
  formCardSubmit.disabled = true;
  openModal(popupTypeNewCard);
  formCard.reset();
});

// Открытие формы аватара с предварительной валидацией
profileImage.addEventListener("click", () => {
  clearValidation(formAvatar, validationConfig);
  formAvatarSubmit.disabled = true;
  openModal(popupTypeAvatar);
  formAvatar.reset();
});

//Функция отправки новых данных профиля
function handleTypeEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const myselfObject = {
    nameMy: nameTypeEdit.value,
    jobMy: descriptionTypeEdit.value,
  };
  formTypeEditSubmit.textContent = "Сохранение...";
  sendMyDatas(myselfObject)
    .then((data) => {
      profileTitle.textContent = myselfObject.nameMy;
      profileDescription.textContent = myselfObject.jobMy;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
      formTypeEditSubmit.disabled = true;
    })
    .finally(() => {
      formTypeEditSubmit.textContent = "Сохранить";
      if (popupTypeEdit.classList.contains("popup_is-opened")) {
        formTypeEditSubmit.disabled = false;
      }
    });
}

//Функция отправки новой карточки
function submitNewCard(evt) {
  evt.preventDefault();
  const newObjectCard = {
    nameCard: nameCardInput.value,
    linkCard: linkCardInput.value,
  };
  formCardSubmit.textContent = "Сохранение...";
  addCardServer(newObjectCard)
    .then((data) => {
      const newCard = addCard(
        data.name,
        data.link,
        deleteCard,
        openFullScreen,
        data.owner._id,
        data.owner._id,
        data.likes,
        data._id
      );

      placesList.prepend(newCard); //Вставляем новyю карточку в начало контейнера
      formCard.reset(); //Очищаем поля формы
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
      formCardSubmit.disabled = true;
    })
    .finally(() => {
      formCardSubmit.textContent = "Создать";
      if (popupTypeNewCard.classList.contains("popup_is-opened")) {
        formCardSubmit.disabled = false;
      }
    });
}

//Создаем функцию редактирования аватара
function submitAvatarLink(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const linkAvatar = linkAvatarInput.value;
  formAvatarSubmit.textContent = "Сохранение...";
  updateUserAvatar(linkAvatar)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${linkAvatar})`;
      closeModal(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(err);
      formAvatarSubmit.disabled = true;
    })
    .finally(() => {
      formAvatarSubmit.textContent = "Сохранить";
      if (popupTypeAvatar.classList.contains("popup_is-opened")) {
        formAvatarSubmit.disabled = false;
      }
    });
}

// Вызовем функцию
enableValidation(validationConfig);

const promises = [receiveUser(), receiveCards()];
Promise.all(promises)
  .then(([user, cards]) => {
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    cards.forEach((card) => {
      placesList.append(
        addCard(
          card.name,
          card.link,
          deleteCard,
          openFullScreen,
          user._id,
          card.owner._id,
          card.likes,
          card._id
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

formTypeEdit.addEventListener("submit", (evt) => {
  handleTypeEditFormSubmit(evt);
  formTypeEditSubmit.disabled = true;
});

formCard.addEventListener("submit", (evt) => {
  submitNewCard(evt);
  formCardSubmit.disabled = true;
});

formAvatar.addEventListener("submit", (evt) => {
  submitAvatarLink(evt);
  formAvatarSubmit.disabled = true;
});
