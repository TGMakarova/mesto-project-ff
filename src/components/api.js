import {profileInfo, profileTitle, profileDescription, profileImage, placesList} from "./constants.js";
import { addCard, deleteCard, likeCard } from "./cards.js";
import { closeModal, openFullScreen, openModal } from "./modal.js";

const config = {
     baseUrl:'https://nomoreparties.co/v1/wff-cohort-7', 
    headers: {
             authorization: '04aae92a-972d-42dc-b1c4-d7cc58bae396',
            'Content-Type': 'application/json'
        }
}
 /*
export const iAmUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
   
        .then((result) => {
            const resultJSON = JSON.stringify(result);
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
        }); 
};

export const receiveCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET'
    })
        .then(res => {
            if (res.ok) { return res.json(); }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            const resultJSON = JSON.stringify(result);
            console.log(typeof resultJSON);
            console.log(resultJSON);
            const enterCards = JSON.parse(resultJSON);
            console.log(typeof enterCards);
            console.log(enterCards);
            let i;
            for(i = 0; i <  enterCards.length; i++) {
        placesList.append(      
            addCard(enterCards[i].name, enterCards[i].link, deleteCard, openFullScreen, likeCard));
    }      
        });    
        };
    */

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
            about: 'Student and Student'
        })
    })  
}

/*export const addCardServer = () => {
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: 'Saint-Petersburg',
            link: 'https://i.postimg.cc/2jq80kvJ/IMG-9631.jpg'
    }) 
    
})
}
*/

  
