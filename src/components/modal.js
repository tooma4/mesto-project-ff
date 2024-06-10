
// функция открытие модального окна
export function openModal(modal) {

  // Добавляет плавный переход при открытии
  modal.classList.add('popup_is-animated');

  // Ставлю таймер для правильного срабатывания плавного перехода при 1 клике
  setTimeout(() => {
    // Добавление класса, окну (класс показывает окно)
    modal.classList.add('popup_is-opened');
  }, 1);
  
  // добавил слушатель, при нажатии клавишы Escape - закрыть попап
  document.addEventListener('keydown', handleEscape);
};

// функция закрытия модального окна
export function closeModal(modal) {

  // Добавляет плавный переход при закрытии
  modal.classList.add('popup_is-animated');
  // Удаляет класс у модального окна
  modal.classList.remove('popup_is-opened');

  // удалил слушатель клавиши Escape
  document.removeEventListener('keydown', handleEscape);

};

// функция управлением клавиши Escape
export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); // 
    closeModal(openedPopup)
  }
}

