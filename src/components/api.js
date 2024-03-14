export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "9d0ae488-accd-488d-9561-394355167fb8",
    "Content-Type": "application/json",
  },
};

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const receiveUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkError(res));
};

//Запрос на получение карточек с сервера
export const receiveCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => checkError(res));
};

//Запрос на обновление данных пользователя
export const sendMyDatas = (myselfObject) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: myselfObject.nameMy,
      about: myselfObject.jobMy,
    }),
  }).then((res) => checkError(res));
};

//Запрос на отправку карточки на сервер
export const addCardServer = (newObjectCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: newObjectCard.nameCard,
      link: newObjectCard.linkCard,
    }),
  }).then((res) => checkError(res));
};

//Запрос на сервер на удаление карточки

export const deleteCardServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => checkError(res));
};

//Запрос на сервер на установку - удаление лайков

export const toggleLike = (cardID, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then((res) => checkError(res));
};

//Запрос на сервер на обновление Аватара

export const updateUserAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    }),
  }).then((res) => checkError(res));
};
