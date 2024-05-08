// @todo: Темплейт карточки

//нахожу и получаю содержимое шаблона;

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

//место куда будут создаваться карточки

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(dataCard, removeCard) {
  //Копирую шаблон, нахожу элементы и записываю в переменные

  let newCard = cardTemplate.cloneNode(true);
  let cardImageLink = newCard.querySelector('.card__image');
  let cardImageAlt = newCard.querySelector('.card__image');
  let cardTitle = newCard.querySelector('.card__title');

  //нахожу кнопку удаления карточки и вешаю обработчик

  let iconDelete = newCard.querySelector('.card__delete-button');
  iconDelete.addEventListener('click', removeCard);

  // задаю значения и возвращаю карточку

  cardImageLink.src = dataCard.link;
  cardImageAlt.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  return newCard;
}
// функция добавления карточки

function addCard(card) {
  cardsContainer.append(card);
}

// @todo: Функция удаления карточки

function removeCard(evt) {
  //передаю ближайший родительский элемент и удаляю

  const card = evt.target.closest('.card');
  console.log('удаление');
  card.remove();
}

// @todo: Вывести карточки на страницу

//Перебираю массив на каждом элементе и передаю элемент массива в функцию, затем выводится 6 карточек на страницу

initialCards.forEach((dataCard) => {
  addCard(createCard(dataCard, removeCard));
});
