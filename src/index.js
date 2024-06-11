
import './pages/index.css';
import { createCard, removeCard, likeCard } from "./components/card";
import { initialCards } from "./scripts/cards";
import { openModal, closeModal } from './components/modal';



// КНОПКИ

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
  popupImageLink.alt = name;  popupImageName.textContent = name;
  
}

//функция обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы

  // Получаю значение полей из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  // и вставляю новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

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

  // вызываю функцию добавления карточки и в ней
  // вызываю функцию создания карточки и передаю в нее данные объекта и другие аргрументы
  addCardBefore(createCard(initialCard, removeCard, openModalImage, likeCard));

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

// ВЫВОД

// @todo: Вывести карточки на страницу
// Перебираю массив на каждом элементе и передаю элемент массива в функцию, затем выводится 6 карточек на страницу
initialCards.forEach((dataCard) => {
  addCard(createCard(dataCard, removeCard, openModalImage, likeCard));
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

// Вешаю обработчик на кнопку редактиовать профиль
// Открытие модального окна по клику кнопки
profileEditButton.addEventListener('click', function() {
  // Вставляю значения из профиля в поля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
  
});

// Вешаю обработчик на кнопку добавить карточку
// Открытие модального окна по клику кнопки
profileAddCardButton.addEventListener('click', function() {
  openModal(popupAddCard);
});

// Вешаю обработчик на форму "редактиовать профиль"
// Изменить данные при нажатии на кнопку "Сохранить"
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Вешаю обработчик на форму "добавить карточку"
// Изменить данные при нажатии на кнопку "Сохранить"
addCardForm.addEventListener('submit', handleAddCardFormSubmit);











  


