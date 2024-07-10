import { cardTemplate } from "..";
import { deleteCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(dataCard, userId, openModalImage, removeCard, likeCard) { // @todo: Функция создания карточки

  const newCard = cardTemplate.cloneNode(true); // копирую шаблон
  const cardImage = newCard.querySelector('.card__image'); // нахожу элемент и записываю в переменную
  const cardTitle = newCard.querySelector('.card__title'); // нахожу элемент и записываю в переменную
  cardImage.src = dataCard.link; // задаю значение
  cardImage.alt = dataCard.name; // задаю значение
  cardTitle.textContent = dataCard.name; // задаю значение

  cardImage.addEventListener('click', () => { // добавляю слушатель на элемент картинки и вызываю при клике на нем openModalImage
    openModalImage(dataCard.link, dataCard.name);
  });

  const iconDelete = newCard.querySelector('.card__delete-button'); // нахожу кнопку удаления карточки и вешаю обработчик
  const userCardId = dataCard.owner['_id'];
  const cardId = dataCard._id;
  
  if(userId === userCardId) {
    iconDelete.addEventListener('click', () => {
      deleteCard(cardId)
          .then(() => {
            removeCard(iconDelete);
          })
          .catch((err) => {
            console.log(err);
          });
    });
  }
  else {
    iconDelete.hidden = true;
  };

  const iconLike = newCard.querySelector('.card__like-button'); // нахожу кнопку лайка карточки и вешаю обработчик
  const iconLikeCount = newCard.querySelector('.current-value-likes');  // нахожу span кол-ва лайков карточки
  const likes = dataCard.likes; // создаю переменную и помещаю в нее массив лайкнувших карточку
  const likesCount = likes.length; // создаю переменную-счетчик и помещаю в нее длинну массива лайкнувших
  iconLikeCount.textContent = likesCount; // вставляю значение в спан

  if (likes.some(like => like._id === userId)) {
    iconLike.classList.add('card__like-button_is-active');
  } else {
    iconLike.classList.remove('card__like-button_is-active');
  }

  iconLike.addEventListener('click', () => {

    if(iconLike.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
      .then((res) => {
        iconLike.classList.toggle('card__like-button_is-active')
        const updatedLikes = res.likes;
        const likesCount = updatedLikes.length;
        iconLikeCount.textContent = likesCount;
        dataCard.likes = updatedLikes;
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      putLikeCard(cardId, likesCount)
        .then((res) => {
          likeCard(iconLike, res, iconLikeCount);
          dataCard.likes = res.likes;
        })
        .catch((err) => {
        console.log(err);
        })
    }
  });
  return newCard; // возращаю карточку
}

export function removeCard(evt) { // @todo: Функция удаления карточки
  const card = evt.closest('.card'); //передаю ближайший родительский элемент и удаляю
  card.remove();
};

export function likeCard(iconLike, res, iconLikeCount) { // @todo: Функция лайка карточки
   // Добавляю класс анимации на элемент по котором будет клик мышкой
  iconLike.classList.toggle('card__like-button_is-active')
  const likes = res.likes;
  const likesCount = likes.length;
  iconLikeCount.textContent = likesCount;
}

