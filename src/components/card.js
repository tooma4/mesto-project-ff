import { cardTemplate } from "..";


// @todo: Функция создания карточки

export function createCard(dataCard, removeCard, openModalImage, likeCard ) {

  //Копирую шаблон, нахожу элементы и записываю в переменные
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');


  //нахожу кнопку удаления карточки и вешаю обработчик
  const iconDelete = newCard.querySelector('.card__delete-button');
  iconDelete.addEventListener('click', removeCard);

  //нахожу кнопку лайка карточки и вешаю обработчик
  const iconLike = newCard.querySelector('.card__like-button');
  iconLike.addEventListener('click', likeCard);

  // задаю значения и возвращаю карточку
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  // добавляю слушатель на элемент картинки и вызываю при клике на нем openModalImage
  cardImage.addEventListener('click', () => {
    openModalImage(dataCard.link, dataCard.name);
  });

  // возращаю карточку
  return newCard;
}

// @todo: Функция удаления карточки

export function removeCard(evt) {

  //передаю ближайший родительский элемент и удаляю
  const card = evt.target.closest('.card');
  card.remove();
};

// @todo: Функция лайка карточки

export function likeCard(evt) {
  // Добавляю класс анимации на элемент по котором будет клик мышкой
  evt.target.classList.toggle('card__like-button_is-active');
}