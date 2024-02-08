export const formSelector = document.querySelector('.popup__form');
export const inputSelector = formSelector.querySelector('.popup__input');
export const inputErrorClass = formSelector.querySelector('.popup__input_type_error');
//export const submitButtonSelector = formSelector.querySelector('.popup__button');


// Функция, которая добавляет класс с ошибкой

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
 // console.log(inputSelector.id);

  inputSelector.classList.add('popup__input_type_error');
  //formError.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};
const isValid = (formSelector, inputSelector) => {
  if (inputSelector.validity.patternMismatch) {
    // Если поле не проходит валидацию, покажем ошибку
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    
  } else {
    // Если проходит, скроем
    inputSelector.setCustomValidity("");
  }


  if (!inputSelector.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    
  } else {
    // Если проходит, скроем
    hideInputError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
 const submitButtonSelector = formSelector.querySelector('.popup__button');
 toggleButtonState(inputList, submitButtonSelector);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputSelector) => {
    // каждому полю добавим обработчик события input
    
    inputSelector.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
}; 


const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputSelector.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, submitButtonSelector) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        submitButtonSelector.disabled = true;
    submitButtonSelector.classList.add('popup__button_disabled');
  } else {
        // иначе сделай кнопку активной
        submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove('popup__button_disabled');
  }
}; 

// Функция, которая проверяет валидность поля









const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formSelector) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formSelector);
  });
};

// Вызовем функцию
enableValidation(); 