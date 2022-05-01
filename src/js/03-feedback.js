import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
  submitBtn: document.querySelector('button'),
};

refs.form.addEventListener('input', throttle(formHandler, 500));
refs.form.addEventListener('click', submitHandler);

const FORM_INPUT_VALUE = 'feedback-form-state';
const formInputData = {};

restoreValueToForm();

function formHandler(e) {
  e.preventDefault();
  formInputData[e.target.name] = e.target.value;
  save(FORM_INPUT_VALUE, formInputData);
}

function restoreValueToForm() {
  const restoreValue = getFromStorage(FORM_INPUT_VALUE);
  if (restoreValue) {
    refs.email.value = restoreValue.email;
    refs.textarea.value = restoreValue.message;
  }
  return formInputData;
}

function submitHandler(e) {
  e.preventDefault();

  if (e.target === refs.submitBtn) {
    if (getFromStorage(FORM_INPUT_VALUE)) {
      console.clear();
      console.log(getFromStorage(FORM_INPUT_VALUE));
    }
    e.currentTarget.reset();

    localStorage.removeItem(FORM_INPUT_VALUE);
  }
}

function save(key, value) {
  try {
    const toJsonConvertValue = JSON.stringify(value);
    localStorage.setItem(key, toJsonConvertValue);
  } catch (error) {
    console.error('Error convert to JSON', error.message);
  }
}

function getFromStorage(key) {
  try {
    const valueFromStorage = localStorage.getItem(key);
    return valueFromStorage === null ? undefined : JSON.parse(valueFromStorage);
  } catch (error) {
    console.error('Get from storage error', error.message);
  }
}
