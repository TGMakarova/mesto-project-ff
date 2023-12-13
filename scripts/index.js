// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) =>
  placesList.append(addCard(item.name, item.link, deleteCard))
);
