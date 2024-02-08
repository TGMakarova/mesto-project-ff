const cardTemplate = document.querySelector("#card-template").content;
 

// @todo: Функция создания карточки

export function addCard(name, link, deleteCard, openFullScreen, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const titleCard = cardElement.querySelector(".card__title");
  const imageCard = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button"); 

  titleCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;
   
  imageCard.addEventListener("click", function () {
    openFullScreen(name, link);
  });
  deleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);
  return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

//Функция like
export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
