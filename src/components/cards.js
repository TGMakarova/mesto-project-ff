import { config } from "./api.js"

const cardTemplate = document.querySelector("#card-template").content;

//Запрос на сервер на удаление карточки

export const deleteCardServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    headers: config.headers,
    method: 'DELETE'
})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
// Запрос на сервер  на установку лайка

export const likeCardServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    headers: config.headers,
    method: 'PUT'
})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// @todo: Функция удаления карточки

export function deleteCard(event, cardID) {
  
  deleteCardServer(cardID);
  const listItem = event.target.closest(".places__item");
  listItem.remove();
  
  
}

//Функция like
export function likeCard(event, cardID) {
  event.target.classList.toggle("card__like-button_is-active");
  //likeCardServer(cardID);
}


// @todo: Функция создания карточки

export function addCard(name, link, deleteCard, openFullScreen, likeCard, myID, ownerID, likeNumber, cardID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const titleCard = cardElement.querySelector(".card__title");
  const imageCard = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button"); 
  const cardCounter = cardElement.querySelector(".card__counter");
  const cardName = cardElement.querySelector(".card__ID");

  titleCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;
  cardCounter.textContent = likeNumber; 
  cardName.value = cardID;

  imageCard.addEventListener("click", function () {
    openFullScreen(name, link);
  });
  if (myID === ownerID) {
    console.log(cardID);
    deleteButton.addEventListener("click", deleteCard);
    
  }
  else {
    deleteButton.remove()
  };

  cardLikeButton.addEventListener("click", likeCard);
  return cardElement;


}


