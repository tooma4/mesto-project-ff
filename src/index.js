
import './pages/index.css';
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal } from './components/modal';
import { enableValidation} from './scripts/validation';
import { config, getUserMe, updateUserMe, getInitialCards, addCardOnServer, updateAvatar} from './scripts/api';


// КНОПКИ

const profileAvatar = document.querySelector('.profile__image');

// кнопка - "редактиовать профиль"
const profileEditButton = document.querySelector('.profile__edit-button');

// кнопка - "добавить карточку"
const profileAddCardButton = document.querySelector('.profile__add-button');

// ПОПАПЫ

//все попапы
const popups = document.querySelectorAll('.popup');

// попап редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');

// попап создания карточки
const popupAddCard = document.querySelector('.popup_type_new-card');

// попап карточки
const popupImage = document.querySelector('.popup_type_image');

// попап потверждения удаления
const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');

// попап потверждения удаления
const popupAvatar = document.querySelector('.popup_type_avatar');

// элемент картинки попапа
const popupImageLink = document.querySelector('.popup__image');

// элемент имени картинки попапа
const popupImageName = document.querySelector('.popup__caption');


// @todo: DOM узлы

// данные имени
const profileName = document.querySelector('.profile__title');
// данные профессии
const profileJob = document.querySelector('.profile__description');


//Форма редактирования профиля
const profileForm = popupEdit.querySelector('div.popup_type_edit .popup__content .popup__form');

//Форма редактирования профиля
const deleteForm = document.querySelector('div.popup_type_confirm-delete .popup__content-min .popup__form');

//Форма редактирования профиля
const avatarForm = document.querySelector('div.popup_type_avatar .popup__content .popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');

//поля формы редактирования профиля
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

//Форма добавления карточки
const addCardForm = popupAddCard.querySelector('div.popup_type_new-card .popup__content .popup__form');

//поля формы добавления карточки
const namePlaceInput = addCardForm.querySelector('.popup__input_type_card-name');
const linkInput = addCardForm.querySelector('.popup__input_type_url');

//место куда будут создаваться карточки
const cardsContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
// нахожу и получаю содержимое шаблона;
// Экспортирую перенную в card.js
export const cardTemplate = document.querySelector('#card-template').content;


//ФУНКЦИИ


// функция открытия модального окна по картинке
function openModalImage(link, name) {

  openModal(popupImage);

  popupImageLink.src = link;
  popupImageLink.alt = name; 
  popupImageName.textContent = name;
  
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы

  renderLoadingAvatarAndDeleteCard(true, evt.target);
  updateAvatar(avatarInput.value)
    .then((result) => {
      profileAvatar.setAttribute("style", `background-image: url('${result.avatar}')`);
      
    })
    .finally(() => {
      renderLoadingAvatarAndDeleteCard(false, evt.target);
    })
    enableValidation({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });

  closeModal(popupAvatar); // вызов функции закрытия попапа
}

//функция обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы
  
  renderLoadingProfileAndAddCard(true, evt.target);
  // Получаю значение полей из свойства value и передаю функции updateUserMe  
  updateUserMe(nameInput.value, jobInput.value)
    .then((result) => {
      getUserMe(result)
        .then((data) => {
          profileName.textContent = data.name; // Выберите элементы, куда должны быть вставлены значения полей          
          profileJob.textContent = data.about; // и вставляю новые значения с помощью textContent
  });
    })
    .finally(() => {
      renderLoadingProfileAndAddCard(false, evt.target);
    })

  closeModal(popupEdit); // вызов функции закрытия попапа
}

//функция обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы

  //Создаю объект с данными для передачи в функцию создания карточки
  const initialCard = {
    name: namePlaceInput.value,
    link: linkInput.value
  }
  renderLoadingProfileAndAddCard(true, evt.target);
  // отправляю данные новой карточки на сервер и создаю новую карточку на основе этих данных
  addCardOnServer(initialCard)
  .then((res) => {
    addCardBefore(createCard(res, removeCard, openModalImage, likeCard, popupConfirmDelete, deleteForm));;
  })
  .finally(() => {
    renderLoadingProfileAndAddCard(false, evt.target);
  })

  // функция закрытия попапа
  closeModal(popupAddCard); 

  // Сбрасываю значения полей
  evt.target.reset();
}

// функция добавления карточки в конец
function addCard(card) {
  cardsContainer.append(card);
}

// функция добавления карточки в начало
function addCardBefore(card) {
  cardsContainer.prepend(card);
}

function renderLoadingProfileAndAddCard(isLoading, button) {
  if(isLoading) {
    const buttonText = button.querySelector('.popup__button');
    buttonText.textContent = "Сохранение...";
  }
  else {
    const buttonText = button.querySelector('.popup__button');
    buttonText.textContent = "Сохранить";
  }
}

function renderLoadingAvatarAndDeleteCard(isLoading, button) {
  if(isLoading) {
    const buttonText = button.querySelector('.popup__button');
    buttonText.textContent = "Сохранение...";
  }
  else {
    const buttonText = button.querySelector('.popup__button');
    buttonText.textContent = "Да";
  }
}

// ВЫВОД


// @todo: Вывести карточки пользователей на страницу
// Перебираю массив на каждом элементе и передаю элемент массива в функцию, затем выводятся карточки пользователей на страницу

 getInitialCards()
    .then((result) => {
      result.forEach((dataCard) => {
        addCard(createCard(dataCard, removeCard, openModalImage, likeCard, popupConfirmDelete, deleteForm));
      });
    }) 
    .catch((err) => {
      console.log(err)
    }); 

// @todo: Вывести данные Имя, Занятие, Аватар на страницу

getUserMe()
  .then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    profileAvatar.setAttribute("style", `background-image: url('${result.avatar}')`);
  });

// ОБРАБОТЧИКИ-СЛУШАТЕЛИ


// прохожусь по всем попапам и вешаю обработчик с условиями:
// (если открыто модальное окно и клик по оверлэю - закрыть попап)
// (если кликнуть по крестику окна - закрыть попап)
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if(evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

profileAvatar.addEventListener('click', function() {
  openModal(popupAvatar);
})

// Вешаю обработчик на кнопку редактиовать профиль
// Открытие модального окна по клику кнопки
profileEditButton.addEventListener('click', function() {
  
  
  // Вставляю значения из профиля в поля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

// Вешаю обработчик на кнопку добавить карточку
// Открытие модального окна по клику кнопки
profileAddCardButton.addEventListener('click', function() {
  openModal(popupAddCard);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

// Вешаю обработчик на форму "редактиовать профиль"
// Изменить данные при нажатии на кнопку "Сохранить"
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Вешаю обработчик на форму "добавить карточку"
// Изменить данные при нажатии на кнопку "Сохранить"
addCardForm.addEventListener('submit', handleAddCardFormSubmit);


// Вешаю обработчик на форму "аватар"
// Изменить данные при нажатии на кнопку "Сохранить"
avatarForm.addEventListener('submit', handleAvatarFormSubmit);



  


