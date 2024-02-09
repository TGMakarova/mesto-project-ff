
 export  const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Функция, которая добавляет класс с ошибкой

const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const isValid = (validationConfig, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // Если поле не проходит валидацию, покажем ошибку
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    
  } else {
    // Если проходит, скроем
    inputElement.setCustomValidity("");
  }


  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
    
  } else {
    // Если проходит, скроем
    hideInputError(validationConfig, formElement, inputElement);
  }
};

const setEventListeners = (validationConfig, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
 const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
 const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
 toggleButton(validationConfig, inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(validationConfig, formElement, inputElement);
      toggleButton(validationConfig, inputList, buttonElement);
    });
  });
}; 


const hasInvalidInput = (inputList) => {
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

const toggleButton = (validationConfig, inputList, buttonElement) => {
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

// Функция, которая проверяет валидность поля

export const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(validationConfig, formElement);
  });
};

export const clearValidation = (formElement, validationConfig) => {
  //const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   inputList.forEach(inputElement => {
     hideInputError(validationConfig, formElement, inputElement);
     
   });
}