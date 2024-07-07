const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  token: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
  cohortId: 'wff-cohort-17',
  headers: {
    authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
    'Content-Type': 'application/json'
  }
}

// Функция - запрос загрузки информации о пользователе с сервера

function getUserMe() {

  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }

        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    

}

// Функция - запрос на изменение данных профиля

function updateUserMe(updateName, updateAbout) {
  
 return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: updateName,
      about: updateAbout
    })
  });
}

function addCardOnServer(initialCard) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-17/cards", {
    method: 'POST',
    headers: { 
      authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: initialCard.name,
      link: initialCard.link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// ФУНКЦИИ //

// Функция запроса к карточкам пользователей
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/${cardId}`, {
    method: 'DELETE',
    headers: { 
      authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function putLikeCard(cardId, likes) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: { 
      authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: {likes},
      }),
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function deleteLikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: { 
      authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
      'Content-Type': 'application/json'
    },

  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function updateAvatar(linkAvatar) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json(); // возвращаем объект 
      }
  
        // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export {config, getUserMe, updateUserMe, getInitialCards, addCardOnServer, deleteCard, updateAvatar, putLikeCard, deleteLikeCard};



  