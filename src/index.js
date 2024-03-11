import "./pages/index.css";
import { addCard, deleteCard } from "./components/cards.js";
import { closeModal, openModal, closeOverlay } from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";
import {
  placesList,
  profileEditButton,
  profileAddButton,
  popupTypeEdit,
  popupTypeEditClose,
  profileImage,
} from "./components/constants.js";
import {
  popupTypeNewCard,
  popupTypeNewCardClose,
  popupTypeImageClose,
} from "./components/constants.js";
import { profileTitle, profileDescription } from "./components/constants.js";
import {
  popupTypeImage,
  popupImage,
  popupCaption,
} from "./components/constants.js";
import {
  popupTypeAvatar,
  popupTypeAvatarClose,
} from "./components/constants.js";
import {
  receiveUser,
  receiveCards,
  sendMyDatas,
  addCardServer,
  updateUserAvatar,
} from "./components/api.js";
import { validationConfig } from "./components/constants.js";

popupTypeEdit.addEventListener("click", closeOverlay);

popupTypeNewCard.addEventListener("click", closeOverlay);

popupTypeImage.addEventListener("click", closeOverlay);

popupTypeAvatar.addEventListener("click", closeOverlay);

popupTypeEditClose.addEventListener("click", () => {
  closeModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(formCard, validationConfig);
  formCard.querySelector('[type="submit"]').disabled = true;
  openModal(popupTypeNewCard);
  formCard.reset();
});

profileImage.addEventListener("click", () => {
  clearValidation(formAvatar, validationConfig);
  formAvatar.querySelector('[type="submit"]').disabled = true;
  openModal(popupTypeAvatar);
  formAvatar.reset();
});

popupTypeNewCardClose.addEventListener("click", () => {
  closeModal(popupTypeNewCard);
});

popupTypeImageClose.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

//Создание функции полного экрана
function openFullScreen(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

popupTypeAvatarClose.addEventListener("click", () => {
  closeModal(popupTypeAvatar);
});

//Первоначальное заполнение данными профиля: имя и знятие
const formTypeEdit = document.querySelector('[name="edit-profile"]'); //Обращаемся к форме редактирования профиля
const nameTypeEdit = formTypeEdit.elements.name; //Обращаемся к элементу формы имя
const descriptionTypeEdit = formTypeEdit.elements.description; //Обращаемся к элементу формы занятие

profileEditButton.addEventListener("click", () => {
  clearValidation(formTypeEdit, validationConfig);
  formTypeEdit.querySelector('[type="submit"]').disabled = false;
  openModal(popupTypeEdit);
  nameTypeEdit.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  descriptionTypeEdit.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
});

function handleTypeEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const myselfObject = {
    nameMy: nameTypeEdit.value,
    jobMy: descriptionTypeEdit.value,
  };
  popupTypeEditClose.textContent = "Сохранение...";
  sendMyDatas(myselfObject)
    .then((data) => {
      profileTitle.textContent = myselfObject.nameMy;
      profileDescription.textContent = myselfObject.jobMy;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
      formTypeEdit.querySelector('[type="submit"]').disabled = true;
    })

    .finally(() => {
      popupTypeEditClose.textContent = "Сохранить";
      if (popupTypeEdit.classList.contains("popup_is-opened")) {
        formTypeEdit.querySelector('[type="submit"]').disabled = false;
      }
    });
}

// Находим форму и поля формы в DOM
const formCard = document.querySelector('[name="new-place"]'); // Воспользуйтесь методом querySelector()
const nameCardInput = formCard.querySelector('[name="place-name"]'); // Воспользуйтесь инструментом .querySelector()
const linkCardInput = formCard.link; // Воспользуйтесь инструментом .querySelector()

function submitNewCard(evt) {
  evt.preventDefault();
  const newObjectCard = {
    nameCard: nameCardInput.value,
    linkCard: linkCardInput.value,
  };
  popupTypeNewCardClose.textContent = "Сохранение...";
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
      formCard.querySelector('[type="submit"]').disabled = true;
    })
    .finally(() => {popupTypeNewCardClose.textContent = "Создать";
      if (popupTypeNewCard.classList.contains("popup_is-opened")) {
        formCard.querySelector('[type="submit"]').disabled = false;
      }
    });
}

// Находим поля формы аватара в DOM
const formAvatar = document.querySelector('[name="new-avatar"]');
const linkAvatarInput = formAvatar.link;

//Создаем функцию редактирования аватара
function submitAvatarLink(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const linkAvatar = linkAvatarInput.value;
  popupTypeAvatarClose.textContent = "Сохранение...";
  updateUserAvatar(linkAvatar)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${linkAvatar})`;
      closeModal(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(err);
      formAvatar.querySelector('[type="submit"]').disabled = true;
    })
    .finally(() => {
      popupTypeAvatarClose.textContent = "Сохранить";
      if (popupTypeAvatar.classList.contains("popup_is-opened")) {
        formAvatar.querySelector('[type="submit"]').disabled = false;
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
  formTypeEdit.querySelector('[type="submit"]').disabled = true;
});

formCard.addEventListener("submit", (evt) => {
  submitNewCard(evt);
  formCard.querySelector('[type="submit"]').disabled = true;
});

formAvatar.addEventListener("submit", (evt) => {
  submitAvatarLink(evt);
  formAvatar.querySelector('[type="submit"]').disabled = true;
});
