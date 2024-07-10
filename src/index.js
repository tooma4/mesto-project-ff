
import './pages/index.css';
import { createCard, removeCard, likeCard, } from "./components/card";
import { openModal, closeModal, } from './components/modal';
import { enableValidation, clearValidation} from './components/validation';
import { config, getUserMe, updateUserMe, getInitialCards, addCardOnServer, updateAvatar} from './components/api';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// КНОПКИ

const profileAvatar = document.querySelector('.profile__image'); // место аватарки - кликабельно

const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка - "редактиовать профиль"

const profileAddCardButton = document.querySelector('.profile__add-button'); // кнопка - "добавить карточку"

// ПОПАПЫ

const popups = document.querySelectorAll('.popup'); // все попапы

const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля

const popupAddCard = document.querySelector('.popup_type_new-card'); // попап создания карточки

const popupImage = document.querySelector('.popup_type_image'); // попап карточки

const popupAvatar = document.querySelector('.popup_type_avatar'); // попап аватарки

const popupImageLink = document.querySelector('.popup__image'); // элемент картинки попапа

const popupImageName = document.querySelector('.popup__caption'); // элемент имени картинки попапа

// @todo: DOM узлы

const profileName = document.querySelector('.profile__title'); // место имени

const profileJob = document.querySelector('.profile__description'); // место профессии

const cardsContainer = document.querySelector('.places__list'); // место создания карточек

// FORMS

const profileForm = popupEdit.querySelector('div.popup_type_edit .popup__content .popup__form'); //Форма редактирования профиля

const avatarForm = document.querySelector('div.popup_type_avatar .popup__content .popup__form'); // форма аватарки

const addCardForm = popupAddCard.querySelector('div.popup_type_new-card .popup__content .popup__form'); // Форма добавления карточки

// INPUTS

const avatarInput = avatarForm.querySelector('.popup__input_type_url'); // поле формы аватрки

const nameInput = profileForm.querySelector('.popup__input_type_name'); // поля формы редактирования профиля - имя
const jobInput = profileForm.querySelector('.popup__input_type_description'); // поля формы редактирования профиля - профессия

const namePlaceInput = addCardForm.querySelector('.popup__input_type_card-name'); // поля формы добавления карточки - название
const linkInput = addCardForm.querySelector('.popup__input_type_url'); // поля формы добавления карточки - ссылка

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector('#card-template').content; // нахожу и получаю содержимое шаблона; Экспортирую перенную в card.js


// ФУНКЦИИ

function openModalImage(link, name) { // функция открытия модального окна по картинке

  openModal(popupImage);

  popupImageLink.src = link;
  popupImageLink.alt = name; 
  popupImageName.textContent = name;
  
}

function handleAvatarFormSubmit(evt) { // функция обработчик отправки формы аватарки
  evt.preventDefault(); 

  renderLoadingProfileAndAddCardAndAvatar(true, evt.submitter);

  updateAvatar(avatarInput.value)
    .then((result) => {
      profileAvatar.setAttribute("style", `background-image: url('${result.avatar}')`);
      closeModal(popupAvatar);      
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoadingProfileAndAddCardAndAvatar(false, evt.submitter);
    }) 
}

function handleProfileFormSubmit(evt) { // функция обработчик отправки формы редактирования профиля
  evt.preventDefault();
  
  renderLoadingProfileAndAddCardAndAvatar(true, evt.submitter);
  
  updateUserMe(nameInput.value, jobInput.value) // Получаю значение полей из свойства value и передаю функции updateUserMe  
    .then((result) => {
      getUserMe(result)
        .then((data) => {
          profileName.textContent = data.name;  // Выбераны элементы, куда должны быть вставлены значения полей          
          profileJob.textContent = data.about;  // и вставленыновые значения с помощью textContent
          });    
        closeModal(popupEdit);
    })
    .finally(() => {
      renderLoadingProfileAndAddCardAndAvatar(false, evt.submitter);
    })
}


function handleAddCardFormSubmit(evt) { // функция обработчик отправки формы добавления карточки
  evt.preventDefault();

  const initialCard = { // Создаю объект с данными для передачи в функцию - addCardOnServer
    name: namePlaceInput.value,
    link: linkInput.value
  }
  
  renderLoadingProfileAndAddCardAndAvatar(true, evt.submitter); 
                                                    
  addCardOnServer(initialCard) // отправляю данные новой карточки на сервер
  .then((res) => {
    addCardBefore(createCard(res, res.owner, openModalImage, removeCard, likeCard)); // и создаю новую карточку на основе этих данных 
    closeModal(popupAddCard);
    evt.target.reset(); // Сбрасываю значения полей
  })
  .finally(() => {
    renderLoadingProfileAndAddCardAndAvatar(false, evt.submitter);
  })
}

function addCardBefore(card) { // функция добавления карточки в начало
  cardsContainer.prepend(card);
}

function addCard(card) { // функция добавления карточки в конец
  cardsContainer.append(card);
}

function renderLoadingProfileAndAddCardAndAvatar(isLoading, button) { // функция отрисовки загрузки, пока данные профиля и добавления карты, загружаются
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

enableValidation(validationConfig); // включение валидации всех форм

Promise.all([                 // в Promise.all передаем массив промисов которые нужно выполнить 
  getUserMe(), 
  getInitialCards() ]) // @todo: Вывести карточки пользователей на страницу
  .then(([info, initialCards]) => {    // попадаем сюда, когда оба промиса будут выполнены
    initialCards.forEach((dataCard) => { // Перебираю массив на каждом элементе и передаю элемент массива в функцию, затем выводятся карточки пользователей на страницу
      addCard(createCard(dataCard, info._id, openModalImage, removeCard, likeCard));
    });

    profileName.textContent = info.name; // @todo: Вывести данные Имя, Занятие, Аватар на страницу
    profileJob.textContent = info.about;
    profileAvatar.setAttribute("style", `background-image: url('${info.avatar}')`);
  })
  .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
  console.log(err);
  })


// ОБРАБОТЧИКИ-СЛУШАТЕЛИ

popups.forEach((popup) => { // прохожусь по всем попапам
  popup.classList.add('popup_is-animated'); // Добавляет  анимацию - плавный переход

  popup.addEventListener('mousedown', (evt) => { // и вешаю обработчик с условиями:    
    if(evt.target.classList.contains('popup_is-opened')) { // ( если открыто модальное окно и клик по оверлэю - закрыть попап )
      closeModal(popup);
    }
    if(evt.target.classList.contains('popup__close')) { // ( если кликнуть по крестику окна - закрыть попап )
      closeModal(popup);
    }
  });
});

profileAvatar.addEventListener('click', function() { // Вешаю обработчик на область аватрки
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
})

profileEditButton.addEventListener('click', function() { // Вешаю обработчик на кнопку редактиовать профиль
  nameInput.value = profileName.textContent; // Вставляю значения из профиля в поля
  jobInput.value = profileJob.textContent; // Вставляю значения из профиля в поля
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});

profileAddCardButton.addEventListener('click', function() { // Вешаю обработчик на кнопку добавить карточку
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

profileForm.addEventListener('submit', handleProfileFormSubmit); // Вешаю обработчик на форму "редактиовать профиль"

addCardForm.addEventListener('submit', handleAddCardFormSubmit); // Вешаю обработчик на форму "добавить карточку"

avatarForm.addEventListener('submit', handleAvatarFormSubmit); // Вешаю обработчик на форму "аватар"