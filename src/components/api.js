export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "04aae92a-972d-42dc-b1c4-d7cc58bae396",
    "Content-Type": "application/json",
  },
};

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const amUser = () => {
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
  })
  .then(checkResponse);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((error) => {
      error.httpResponseCode = res.status;
      return Promise.reject(error);
  })
}

//Запрос на отправку карточки на сервер
export const addCardServer = (newObjectCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: newObjectCard.nameCard,
      link: newObjectCard.linkCard,
      
    }),
  })
    .then(checkResponse);
};


//Запрос на сервер на удаление карточки

export const deleteCardServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then(checkResponse);
};

//Запрос на сервер на установку - удаление лайков

export const toggleLike = (cardID, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  })
  .then(checkResponse);
};

//Запрос на сервер на обновление Аватара

export const updateUserAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    }),
  })
  .then(checkResponse);
};



