const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  userPath: 'users/me',
  cardsPath: 'cards',
  likesPath: 'likes',
  avatarPath: 'avatar',
  headers: {
    authorization: 'b1fc3e3d-ea10-4845-afe0-240a5e58f6c9',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res)  { // функция проверка ответа сервера и преобразование из json
  if (res.ok) {
    return res.json(); // возвращаем объект 
  }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

function getUserMe() { // Функция - запрос загрузки информации о пользователе с сервера
  return fetch(`${config.baseUrl}/${config.userPath}`, {
    headers: config.headers
  })
    .then(getResponseData);
};

function updateUserMe(updateName, updateAbout) { // Функция - запрос на изменение данных профиля на сервере
  return fetch(`${config.baseUrl}/${config.userPath}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: updateName,
      about: updateAbout
    })
  })
    .then(getResponseData);
};

function addCardOnServer(initialCard) { // Функция - запрос на добавление карточки на сервер
  return fetch(`${config.baseUrl}/${config.cardsPath}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: initialCard.name,
      link: initialCard.link
    })
  })
  .then(getResponseData);
}

function getInitialCards() { // Функция запроса к карточкам пользователей
  return fetch(`${config.baseUrl}/${config.cardsPath}`, {
    headers: config.headers
  })
  .then(getResponseData);
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/${config.cardsPath}/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

function putLikeCard(cardId, likesLength) {
  return fetch(`${config.baseUrl}/${config.cardsPath}/${config.likesPath}/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: {likesLength},
      }),
  })
  .then(getResponseData);
}

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/${config.cardsPath}/${config.likesPath}/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

function updateAvatar(linkAvatar) {
  return fetch(`${config.baseUrl}/${config.userPath}/${config.avatarPath}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar
    })
  })
  .then(getResponseData);
}


export {config, getUserMe, updateUserMe, getInitialCards, addCardOnServer, deleteCard, updateAvatar, putLikeCard, deleteLikeCard};



  