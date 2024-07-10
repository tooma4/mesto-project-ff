
export function openModal(modal) { // функция открытие модального окна
  modal.classList.add('popup_is-opened'); // Добавление класса, окну (класс показывает окно)
  document.addEventListener('keydown', handleEscape); // добавил слушатель, при нажатии клавишы Escape - закрыть попап
};

export function closeModal(modal) { // функция закрытия модального окна
  modal.classList.remove('popup_is-opened'); // Удаляет класс у модального окна
  document.removeEventListener('keydown', handleEscape); // удалил слушатель клавиши Escape
};

export function handleEscape(evt) { // функция управлением клавиши Escape
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); // 
    closeModal(openedPopup)
  }
}

