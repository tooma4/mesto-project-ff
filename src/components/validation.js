
function enableValidation(validationConfig) {

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); // Находим все поля внутри формы, сделаем из них массив методом Array.from
  
  formList.forEach((formElement) => { // Обойдём все элементы полученной коллекции
    setEventListeners(formElement, validationConfig); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  }); 
};

function clearValidation(formElement, validationConfig) {
    
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); // Находим все поля ввода в форме
    
    
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); // Находим кнопку отправки формы
  
  inputList.forEach((inputElement) => { // Очищаем ошибки для каждого поля ввода

    const errorElement = formElement.querySelector(`${inputElement.id}-error`);

    if (errorElement) {
        errorElement.textContent = ''; // Скрываем сообщение об ошибке
        errorElement.classList.remove(validationConfig.errorClass);
    }
  
    inputElement.classList.remove(validationConfig.inputErrorClass); 
  });
  
  buttonElement.classList.add(validationConfig.inactiveButtonClass); // Делаем кнопку отправки неактивной
  buttonElement.disabled = true;
}
  
  function setEventListeners(formElement, validationConfig) {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, validationConfig);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  // Функция isValid теперь принимает formElement и inputElement,
  // а не берёт их из внешней области видимости
  
  function isValid(formElement, inputElement, validationConfig) {

    if (inputElement.validity.patternMismatch) {
      
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }

    
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  function hideInputError(formElement, inputElement, validationConfig) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  // Функция принимает массив полей
  
  function hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };
  
  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  
  function toggleButtonState(inputList, buttonElement, validationConfig) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };

  export {enableValidation, clearValidation};