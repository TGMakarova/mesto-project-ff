export const formSelector = document.querySelector('.popup__form');
export const inputSelector = formSelector.querySelector('.popup__input');
export const inputErrorClass = formSelector.querySelector('.popup__input_type_error');

const formError = formSelector.querySelector(`.${inputSelector.id}-error`);

// Функция, которая добавляет класс с ошибкой

const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
  };
  
  // Функция, которая удаляет класс с ошибкой
  
const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = "";
  };
  
  // Функция, которая проверяет валидность поля
 
export const isValid = () => {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      
        showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(inputSelector);
    }
  };
  
 