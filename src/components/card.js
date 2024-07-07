import { cardTemplate } from "..";
import { openModal, closeModal } from "./modal";
import { deleteCard, putLikeCard, deleteLikeCard } from "../scripts/api";


// @todo: Функция создания карточки

export function createCard(dataCard, removeCard, openModalImage, likeCard, popupConfirmDelete, deleteForm) {

  //Копирую шаблон, нахожу элементы и записываю в переменные
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');

  const MY_ID = "33d5db0e38bbc150a00be59e";
  const usersId = dataCard.owner['_id'];
  const cardId = dataCard._id;
  // console.log(cardId);
  //нахожу кнопку удаления карточки и вешаю обработчик
  const iconDelete = newCard.querySelector('.card__delete-button');
  
  if(MY_ID === usersId) {
    iconDelete.addEventListener('click', () => {
      openModal(popupConfirmDelete);

      deleteForm.addEventListener('click', () => {
        handleConfirmDeleteFormSubmit(cardId, popupConfirmDelete, iconDelete);
      })
    });
  }
  else {
    iconDelete.hidden = true;
  }
  
  //нахожу кнопку лайка карточки и вешаю обработчик
  const iconLike = newCard.querySelector('.card__like-button');
  // iconLike.addEventListener('click', likeCard);
  iconLike.addEventListener('click', () => {
    putLikeCard(cardId)
      .then((res) => {
        likeCard(iconLike, res, iconLikeCount, cardId);
      })
  });

  //нахожу span кол-ва лайков карточки
  const iconLikeCount = newCard.querySelector('.current-value-likes');
  //создаю переменную и помещаю в нее массив лайкнувших карточку
  const likes = dataCard.likes;
  //создаю переменную-счетчик и помещаю в нее длинну массива лайкнувших
  const likesCount = likes.length;
  //вставляю значение в спан
  iconLikeCount.textContent = likesCount;

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

function handleConfirmDeleteFormSubmit(id, popupConfirmDelete, iconDelete) {
  deleteCard(id)
    .then(() => {
    removeCard(iconDelete);
  })
  closeModal(popupConfirmDelete); // вызов функции закрытия попапа
}

// @todo: Функция удаления карточки

export function removeCard(evt) {

  //передаю ближайший родительский элемент и удаляю
  const card = evt.closest('.card');
  card.remove();
};

// @todo: Функция лайка карточки

export function likeCard(iconLike, res, iconLikeCount, cardId) {
  if(
    // Добавляю класс анимации на элемент по котором будет клик мышкой
    iconLike.classList.toggle('card__like-button_is-active')) {
      //создаю переменную и помещаю в нее массив лайкнувших карточку
      const likes = res.likes;
      //создаю переменную-счетчик и помещаю в нее длинну массива лайкнувших
      const likesCount = likes.length;
      //вставляю значение в спан
      iconLikeCount.textContent = likesCount;

    }
  else {
    deleteLikeCard(cardId)
      .then((res) => {
        const likes = res.likes;
        //создаю переменную-счетчик и помещаю в нее длинну массива лайкнувших
        const likesCount = likes.length;
        //вставляю значение в спан
        iconLikeCount.textContent = likesCount;
      })
  }
  
}

