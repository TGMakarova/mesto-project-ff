import { deleteCardServer, toggleLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки

export function deleteCard(card, cardID) {
  deleteCardServer(cardID).then((data) => {
    card.remove();
  });
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция создания карточки

export function addCard(
  name,
  link,
  deleteCard,
  openFullScreen,
  likeCard,
  myID,
  ownerID,
  likeNumber,
  cardID
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const titleCard = cardElement.querySelector(".card__title");
  const imageCard = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardCounter = cardElement.querySelector(".card__counter");

  cardCounter.textContent = likeNumber.length;

  const renderLikes = () => {
    //
    if (likeNumber.some((likeNumber) => likeNumber._id === myID)) {
      cardLikeButton.classList.add("card__like-button_is-active");
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active");
    }
  };

  renderLikes();

  titleCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;
  imageCard.addEventListener("click", function () {
    openFullScreen(name, link);
  });

  if (myID === ownerID) {
    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement, cardID);
    });
  } else {
    deleteButton.remove();
  }

  cardLikeButton.addEventListener("click", () => {
    toggleLike(
      cardID,
      cardLikeButton.classList.contains("card__like-button_is-active")
    ).then((data) => {
      console.dir(data);
      cardCounter.textContent = data.likes.length;
      console.log(cardCounter.textContent);
      cardLikeButton.classList.toggle("card__like-button_is-active");
    });
  });
  return cardElement;
}
