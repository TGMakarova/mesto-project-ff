import "./pages/index.css";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
import { closeModal, openFullScreen, openModal } from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation} from "./components/validation.js";
import { placesList, profileEditButton, profileAddButton, popupTypeEdit, popupTypeEditClose, profileImage} from "./components/constants.js";
import { popupTypeNewCard, popupTypeNewCardClose, popupTypeImageClose}from "./components/constants.js";
import {profileInfo, profileTitle, profileDescription} from "./components/constants.js";
import { popupTypeImage, popupImage, popupCaption } from "./components/constants.js";
import { popupTypeAvatar, popupTypeAvatarClose, popupTypeAvatarInput} from "./components/constants.js";
import { iAmUser, receiveCards, myDatas, addCardServer, updateUserAvatar} from "./components/api.js";

const newCardObject = { name: 'Астана', link: 'https://i.postimg.cc/wv55FG9C/IMG-6284.jpg' };


popupTypeEditClose.addEventListener("click", () => {
  closeModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

profileImage.addEventListener("click", () => {
  openModal(popupTypeAvatar);
})

popupTypeNewCardClose.addEventListener("click", () => {
  closeModal(popupTypeNewCard);
});

popupTypeImageClose.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

popupTypeAvatarClose.addEventListener("click", () => {
  closeModal(popupTypeAvatar);
})

//Первоначальное заполнение данными профиля: имя и знятие
const formProfile = document.querySelector('[name="edit-profile"]'); //Обращаемся к форме редактирования профиля
const nameProfile = formProfile.elements.name; //Обращаемся к элементу формы имя
const descriptionProfile = formProfile.elements.description; //Обращаемся к элементу формы занятие



profileEditButton.addEventListener("click", () => {
  clearValidation(formProfile, validationConfig);
  openModal(popupTypeEdit);
  nameProfile.value = profileTitle.textContent; //Присваиваем значение элементу формы имя
  descriptionProfile.value = profileDescription.textContent; //Присваиваем значение элементу формы занятие
});


function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    closeModal(popupTypeEdit);
  
}


formProfile.addEventListener("submit", handleFormSubmit);

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


// Находим поля формы аватара в DOM
const formAvatar = document.querySelector('[name="new-avatar"]'); 
const linkAvatarInput = formAvatar.link;

//Создаем функцию редактирования аватара
function avatarLinkSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const linkAvatar = linkAvatarInput.value;
  console.log(linkAvatar);
  updateUserAvatar(linkAvatar)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${linkAvatar})`;
      closeModal(popupTypeAvatar);
    })
}

// Вызовем функцию
enableValidation(validationConfig); 

    const promises = ([iAmUser(), receiveCards()])
    Promise.all (promises)
      .then(([user, cards]) => {
        profileImage.src = `url(${user.avatar})`;
          profileTitle.textContent = user.name;
          profileDescription.textContent = user.about;
        console.log(user);
      console.log(profileImage.src);
          console.log(profileTitle.textContent);
          console.log(profileDescription.textContent);
        cards.forEach((card) => {
          placesList.append(
            addCard(card.name, card.link, deleteCard, openFullScreen, likeCard, user._id, card.owner._id, card.likes.length, card._id));
          console.log(user._id);
          console.log(card.owner._id);
          console.log(card._id);
        
          })
        console.log(cards);
      });
  

myDatas();

//addCardServer(newCardObject);

//Вызов функции редактирования аватара

formAvatar.addEventListener("submit", (evt) => {
  avatarLinkSubmit(evt);
});

