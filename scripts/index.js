// @todo: Темплейт карточки

//нахожу и получаю содержимое шаблона;

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

//место куда будут создаваться карточки

const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCards(initialCard, removeCard) {
  //Копирую шаблон, задаю значения и вставляю на страницу

  for (const card of initialCard) {
    const newCard = cardTemplate.cloneNode(true);

    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('h2').textContent = card.name;
    placeList.append(newCard);
  }

  //нахожу кнопку удаления карточки и вешаю обработчик

  const iconDelete = document.querySelectorAll('.card__delete-button');
  iconDelete[addEventListener('click', removeCard)];
}

// @todo: Функция удаления карточки

function removeCard(evt) {
  //передаю ближайший родительский элемент и удаляю

  const card = evt.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу

createCards(initialCards, removeCard);
