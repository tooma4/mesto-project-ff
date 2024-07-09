import { cardTemplate } from "..";
import { deleteCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(dataCard, info, openModalImage, openModal, closeModal, removeCard, likeCard, popupConfirmDelete, deleteForm, renderLoadingDeleteCard) { // @todo: Функция создания карточки

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
  const userId = info._id;
  const userCardId = dataCard.owner['_id'];
  const cardId = dataCard._id;
  if(userId === userCardId) {
    iconDelete.addEventListener('click', () => {
      openModal(popupConfirmDelete);
      
      const handleConfirmDeleteFormSubmit = (event) => {
        event.preventDefault();
        renderLoadingDeleteCard(true, event.submitter);
        deleteCard(cardId)
          .then(() => {
            removeCard(iconDelete);
            closeModal(popupConfirmDelete, handleConfirmDeleteFormSubmit);
            deleteForm.removeEventListener('submit', handleConfirmDeleteFormSubmit);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoadingDeleteCard(false, event.submitter);
          })
      };
      deleteForm.addEventListener('submit', handleConfirmDeleteFormSubmit);
    });
  }
  else {
    iconDelete.hidden = true;
  }

  const iconLike = newCard.querySelector('.card__like-button'); // нахожу кнопку лайка карточки и вешаю обработчик
  const iconLikeCount = newCard.querySelector('.current-value-likes');  // нахожу span кол-ва лайков карточки
  const likes = dataCard.likes; // создаю переменную и помещаю в нее массив лайкнувших карточку
  const likesCount = likes.length; // создаю переменную-счетчик и помещаю в нее длинну массива лайкнувших
  iconLikeCount.textContent = likesCount; // вставляю значение в спан

  iconLike.addEventListener('click', () => {
    putLikeCard(cardId, likesCount)
      .then((res) => {
        if(!iconLike.classList.contains('card__like-button_is-active')){
          likeCard(iconLike, res, iconLikeCount);          
        }
        else {
          deleteLikeCard(cardId)
            .then((res) => {
              iconLike.classList.toggle('card__like-button_is-active')
              const likes = res.likes;
              const likesCount = likes.length;
              iconLikeCount.textContent = likesCount;
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
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

