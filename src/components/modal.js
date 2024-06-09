// Импорт кнопок закрывающих модальны окна
// Импорт попапа картинки
import { popupImage} from "../index";


// функция открытие модального окна
export function openModal(modal) {
  // Добавляет плавный переход при открытии
  modal.classList.add('popup_is-animated');
  // Добавление класса, окну (класс показывает окно)
  modal.classList.add('popup_is-opened');

  // Слушатель при нажатии клавишы
  document.addEventListener('keydown', function(event) {

    // Если нажата Escape - сработает функция закрытия окна
    if (event.key === 'Escape') {
      closeModal(modal);
    }
  });
};

// функция закрытия модального окна
export function closeModal(modal) {

  // Добавляет плавный переход при закрытии
  modal.classList.add('popup_is-animated');
  // Удаляет класс у модального окна
  modal.classList.remove('popup_is-opened');

};

// функция закрытия модального окна через оверлэй
export function closeOverlayPopup(evt) {

  // Если цель клика область модального окна (не контента)
  // Срабатывает функция закрытия модального окна
  evt.target.classList.forEach(element => {
    if (element === 'popup') {
      closeModal(evt.target);
    };
  })

};

// функция открытия модального окна по картинке
export function openModalImage(link, name) {
  popupImage.classList.add('popup_is-opened');
  const modalLink = document.querySelector('.popup__image');
  modalLink.src = link;
  const modalName = document.querySelector('.popup__caption');
  modalName.textContent = name;
 

  document.addEventListener('keydown', function(event) {

    if (event.key === 'Escape') {
      closeModal(popupImage);
    }
  });
  
}

