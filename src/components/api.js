
export const config = {
     baseUrl:'https://nomoreparties.co/v1/wff-cohort-7', 
    headers: {
             authorization: '04aae92a-972d-42dc-b1c4-d7cc58bae396',
            'Content-Type': 'application/json'
        }
}
 
const checkError = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const iAmUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(res => checkError(res));
                
};

export const receiveCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET'
    })
        .then(res => checkError(res));
};

export const myDatas = () => {
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: 'Tatiana M',
            about: 'Student and Student',

        })
    })  
}

export const addCardServer = (newCardObject) => {
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: newCardObject.name,
            link: newCardObject.link
    })   
})
}

//Запрос на сервер на обновление Аватара

export const updateUserAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
         avatar:linkAvatar 
      })
  })
      
    .then((res) => {
      if (res.ok) {
          return res.json();     
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })  
}

