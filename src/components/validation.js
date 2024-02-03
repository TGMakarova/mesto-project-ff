export const formSelector = document.querySelector('.popup__form');
export const inputSelector = formSelector.querySelector('.popup__input');
export const inputErrorClass = formSelector.querySelector('.popup__input_type_error');

//const formError = formSelector.querySelector(`.${inputSelector.id}-error`);

// Функция, которая добавляет класс с ошибкой

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  };
  
  // Функция, которая удаляет класс с ошибкой
  
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = "";
  };
  
  // Функция, которая проверяет валидность поля
 
export const isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formSelector, inputSelector);
    }
  };
  
  