import throttle from 'lodash/throttle';

const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const ce = elem => document.createElement(elem);

const inputEmail = qs('input[name="email"]');
const inputMessage = qs('textarea[name="message"]');
const buttonSubmit = qs('button[type="submit"]');
const form = qs('.feedback-form');
const FEEDBACK_KEY = 'feedback-form-state';

const updateInputs = () => {
  try {
    inputEmail.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).email;
    inputMessage.value = JSON.parse(localStorage.getItem(FEEDBACK_KEY)).message;
  } catch {
    log('Whoops!! Nothing to see here. No data in LocalStorage!');
  }
};
const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const storageFeedback = () => {
  let feedback = {
    email: `${inputEmail.value}`,
    message: `${inputMessage.value}`,
  };
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
};

const submitFeedback = e => {
  if (validateEmail(inputEmail.value) === true) {
    e.preventDefault();
    log(JSON.parse(localStorage.getItem(FEEDBACK_KEY)));
    form.reset();
    localStorage.removeItem(FEEDBACK_KEY);
  } else {
    alert('Please type in correct email. Like this one => email@example.com');
  }
};

updateInputs();
inputEmail.addEventListener('input', throttle(storageFeedback, 1000));
inputMessage.addEventListener('input', throttle(storageFeedback, 1000));
buttonSubmit.addEventListener('click', submitFeedback);
