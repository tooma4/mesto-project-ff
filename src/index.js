
import './pages/index.css';
import { createCard, removeCard, likeCard } from "./components/card";
import { initialCards } from "./scripts/cards";
import { openModal, closeModal, closeOverlayPopup, openModalImage} from './components/modal';



// КНОПКИ

// кнопка - "редактиовать профиль"
const profileEditButton = document.querySelector('.profile__edit-button');

// кнопка - "добавить карточку"
const profileAddCardButton = document.querySelector('.profile__add-button');

// Кнопка закрытия попапа - "редактиовать профиль"
const popupButtonCloseEdit = document.querySelector('div.popup_type_edit .popup__content .popup__close');

// Кнопка закрытия попапа - "добавить карточку"
const popupButtonCloseAddCard = document.querySelector('div.popup_type_new-card .popup__content .popup__close');

// Кнопка закрытия попапа - "карточка"
const popupButtonCloseCard = document.querySelector('div.popup_type_image .popup__content .popup__close');


// ПОПАПЫ

// попап редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');

// попап создания карточки
const popupAddCard = document.querySelector('.popup_type_new-card');

// попап карточки
export const popupImage = document.querySelector('.popup_type_image');


// @todo: DOM узлы

// данные имени
const profileName = document.querySelector('.profile__title');
// данные профессии
const profileJob = document.querySelector('.profile__description');


//Форма редактирования профиля
const formElement = popupEdit.querySelector('div.popup_type_edit .popup__content .popup__form');

//поля формы редактирования профиля
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

//Форма добавления карточки
const formAddCard = popupAddCard.querySelector('div.popup_type_new-card .popup__content .popup__form');

//поля формы добавления карточки
const namePlaceInput = formAddCard.querySelector('.popup__input_type_card-name');
const linkInput = formAddCard.querySelector('.popup__input_type_url');

//место куда будут создаваться карточки
const cardsContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
// нахожу и получаю содержимое шаблона;
// Экспортирую перенную в card.js
export const cardTemplate = document.querySelector('#card-template').content;



//ФУНКЦИИ

//функция обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы

  // Получаю значение полей из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  // и вставляю новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  // функция закрытия попапа
  closeModal(popupEdit);
}

//функция обработчик отправки формы добавления карточки
function handleFormAddCardSubmit(evt) {
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
  namePlaceInput.value = '';
  linkInput.value = '';
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

// Вешаю обработчик на кнопку редактиовать профиль
// Открытие модального окна по клику кнопки
profileEditButton.addEventListener('click', function() {
  // Вставляю значения из профиля в поля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
  
});

// Вешаю обработчик на кнопку закрытия попапа "редактиовать профиль"
// Закрытие модального окна по клику кнопки
popupButtonCloseEdit.addEventListener('click', function() {
  closeModal(popupEdit);
});

// Вешаю обработчик на попап "редактиовать профиль"
// Закрытие модального окна по клику оверлэя
popupEdit.addEventListener('click', closeOverlayPopup);


// Вешаю обработчик на кнопку добавить карточку
// Открытие модального окна по клику кнопки
profileAddCardButton.addEventListener('click', function() {
  openModal(popupAddCard);
});

// Вешаю обработчик на кнопку закрытия попапа "добавить карточку"
// Закрытие модального окна по клику кнопки
popupButtonCloseAddCard.addEventListener('click', function() {
  closeModal(popupAddCard)
});

// Вешаю обработчик на попап "добавить карточку"
// Закрытие модального окна по клику оверлэя
popupAddCard.addEventListener('click', closeOverlayPopup);

// Вешаю обработчик на кнопку закрытия попапа "карточка"
// Закрытие модального окна по клику кнопки
popupButtonCloseCard.addEventListener('click', function() {
  closeModal(popupImage);
});

// Вешаю обработчик на попап "карточка"
// Закрытие модального окна по клику оверлэя
popupImage.addEventListener('click', closeOverlayPopup);

// Вешаю обработчик на форму "редактиовать профиль"
// Изменить данные при нажатии на кнопку "Сохранить"
formElement.addEventListener('submit', handleFormSubmit);

// Вешаю обработчик на форму "добавить карточку"
// Изменить данные при нажатии на кнопку "Сохранить"
formAddCard.addEventListener('submit', handleFormAddCardSubmit);










  


