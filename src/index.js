import "./pages/index.css";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
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
  popupNewCardSpan,
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
  amUser,
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
  openModal(popupTypeNewCard);
  formCard.reset();
});

profileImage.addEventListener("click", () => {
  clearValidation(formAvatar, validationConfig);
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
  openModal(popupTypeEdit);
  nameTypeEdit.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  descriptionTypeEdit.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
});

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const myselfObject = {
    nameMy: nameTypeEdit.value,
    jobMy: descriptionTypeEdit.value,
  };
  popupTypeEditClose.textContent = "Сохраняется...";
  sendMyDatas(myselfObject)
    .then((data) => {
      profileTitle.textContent = myselfObject.nameMy;
      profileDescription.textContent = myselfObject.jobMy;
      closeModal(popupTypeEdit);
    })
    .finally(() => {
      popupTypeEditClose.textContent = "Сохранить";
    });
}

// Находим форму и поля формы в DOM
const formCard = document.querySelector('[name="new-place"]'); // Воспользуйтесь методом querySelector()
const nameCardInput = formCard.querySelector('[name="place-name"]'); // Воспользуйтесь инструментом .querySelector()
const linkCardInput = formCard.link; // Воспользуйтесь инструментом .querySelector()

function formSubmitNewCard(evt) {
  evt.preventDefault();
  const newObjectCard = {
    nameCard: nameCardInput.value,
    linkCard: linkCardInput.value,
  };

  addCardServer(newObjectCard).then((data) => {
    const newCard = addCard(
      data.name,
      data.link,
      deleteCard,
      openFullScreen,
      likeCard,
      data.owner._id,
      data.owner._id,
      data.likes,
      data._id
    );

    placesList.prepend(newCard); //Вставляем новyю карточку в начало контейнера
    formCard.reset(); //Очищаем поля формы
    closeModal(popupTypeNewCard);
  });
}

// Находим поля формы аватара в DOM
const formAvatar = document.querySelector('[name="new-avatar"]');
const linkAvatarInput = formAvatar.link;

//Создаем функцию редактирования аватара
function submitAvatarLink(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const linkAvatar = linkAvatarInput.value;
  console.log(linkAvatar);
  updateUserAvatar(linkAvatar).then((data) => {
    profileImage.style.backgroundImage = `url(${linkAvatar})`;
    closeModal(popupTypeAvatar);
  });
}

// Вызовем функцию
enableValidation(validationConfig);

const promises = [amUser(), receiveCards()];
Promise.all(promises).then(([user, cards]) => {
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
        likeCard,
        user._id,
        card.owner._id,
        card.likes,
        card._id
      )
    );
  });
  console.log(cards);
});

formTypeEdit.addEventListener("submit", (evt) => {
  handleFormSubmit(evt);
  formTypeEdit.querySelector('[type="submit"]').disabled = true;
});

formCard.addEventListener("submit", (evt) => {
  formSubmitNewCard(evt);
  formCard.querySelector('[type="submit"]').disabled = true;
});

formAvatar.addEventListener("submit", (evt) => {
  submitAvatarLink(evt);
  formAvatar.querySelector('[type="submit"]').disabled = true;
});
