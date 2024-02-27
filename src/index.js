import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, likeCard } from "./components/cards.js";
import { closeModal, openFullScreen, openModal } from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation} from "./components/validation.js";
//import {formSelector, inputSelector, inputErrorClass} from "./components/validation.js";
import { placesList, profileEditButton, profileAddButton, popupTypeEdit, popupTypeEditClose, profileImage, profileAvatarButton} from "./components/constants.js";
import { popupTypeNewCard, popupTypeNewCardClose, popupTypeImageClose}from "./components/constants.js";
import {profileInfo, profileTitle, profileDescription} from "./components/constants.js";
import { popupTypeImage, popupImage, popupCaption } from "./components/constants.js";
import { popupTypeAvatar, popupTypeAvatarClose, popupTypeAvatarInput } from "./components/constants.js";
import { iAmUser, receiveCards, myDatas, addCardServer} from "./components/api.js";
//import { initialCards } from "./scripts/cards.js";

const newCardObject = {name:'Астана', link: 'https://i.postimg.cc/wv55FG9C/IMG-6284.jpg' };

// Первоначальное заполнение карточек из массива
/*
initialCards.forEach((item) =>
  placesList.append(
    addCard(item.name, item.link, deleteCard, openFullScreen, likeCard)
  )
);
*/


popupTypeEditClose.addEventListener("click", () => {
  closeModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

profileAvatarButton.addEventListener("click", () => {
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

// Находим поля формы аватара в DOM
const formAvatar = document.querySelector('[name="new-avatar"]'); // Воспользуйтесь методом querySelector()

  const linkAvatarInput = formAvatar.querySelector('[name="link"]');// Воспользуйтесь инструментом .querySelector()
  console.log(linkAvatarInput);
  
function avatarLinkSubmit(evt) {
  
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  closeModal(popupTypeAvatar);
}

formAvatar.addEventListener("submit", avatarLinkSubmit);


// Вызовем функцию
enableValidation(validationConfig); 


//iAmUser();

//receiveCards();
/*
const promises = ([iAmUser(), receiveCards()])
  Promise.all (promises)
    .then(([user, cards]) => {
        const resultJSON = JSON.stringify(user);
        console.log(typeof resultJSON);
        console.log(resultJSON);
        const aim = JSON.parse(resultJSON);
        console.log(typeof aim);
        console.log(aim);
        profileTitle.textContent = aim.name;
        profileDescription.textContent = aim.about;
        console.log(aim.name);
        console.log(profileTitle.textContent);
        console.log(profileDescription.textContent);
        profileImage.link = aim.avatar;
        console.log(aim.avatar);
        const myID = aim._id;
        console.log(aim._id);
        console.log(myID);
        
        const cardsJSON = JSON.stringify(cards);
        console.log(typeof cardsJSON);
        console.log(cardsJSON);
        const enterCards = JSON.parse(cardsJSON);
        console.log(typeof enterCards);
      console.log(enterCards);
      
        let i;
      for (i = 0; i < enterCards.length; i++) {
        const cardTitle = enterCards[i].name;
        const cardImage = enterCards[i].link;
        const ownerID = enterCards[i].owner._id;
        const likeNumber = enterCards[i].likes.length;
        const cardID = enterCards[i]._id;
        console.log(cardID);
        console.log(likeNumber);
        console.log(ownerID);
            placesList.append(
                addCard(cardTitle, cardImage, deleteCard, openFullScreen, likeCard, myID, ownerID, likeNumber, cardID));
      }
  
      
    });
     */   
    const promises = ([iAmUser(), receiveCards()])
    Promise.all (promises)
      .then(([user, cards]) => {
          
          profileTitle.textContent = user.name;
          profileDescription.textContent = user.about;
          
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



