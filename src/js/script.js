// For Hamdurger menu
const hamburgerEl = document.querySelector('.hamburger');
const menuEl = document.querySelector('.menu');
const menuVBtnCloseEl = document.querySelector('.menu__btn-close');
const menuOverlayEl = document.querySelector('.menu__overlay');

hamburgerEl.addEventListener('click', () => {
  menuEl.classList.add('active');
});
menuVBtnCloseEl.addEventListener('click', () => {
  menuEl.classList.remove('active');
});

//closing menu by clicking in overlay
menuOverlayEl.addEventListener('click', () => {
  menuEl.classList.remove('active');
});

//For menu
const menuListEl = document.querySelector('.menu__list');

//Menu closes, when item is selected
menuListEl.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  menuEl.classList.remove('active');
});

//For counting percent in skills section
const countersEl = document.querySelectorAll('.skills__rating-item-counter');
const linesEl = document.querySelectorAll('.skills__rating-item-line span');

//Counting percent in skills section
countersEl.forEach((item, i) => {
  linesEl[i].style.width = item.textContent;
});

//For form in contact section
const contactFormEl = document.querySelector('.contacts__form');

//elements in contact form
let nameEl = document.getElementById('name');
let emailEl = document.getElementById('email');
let textEl = document.getElementById('text');
let checkboxEl = document.getElementById('checkbox');

//for resent to en version of site even if smth wrong in addrress
const allLang = ['', 'uk', 'ru'];
console.log(window.location.host);
// if(!allLang.includes.)

//For saving data to LocalStorage and sending them to email

const formData = {};
const LOCALSTORAGE_KEY = 'data';
initForm();

contactFormEl.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  const data = JSON.stringify(formData);

  // finally save to localStorage
  localStorage.setItem(LOCALSTORAGE_KEY, data);
});

//Sending data to email
contactFormEl.addEventListener('submit', e => {
  e.preventDefault();

  formData[e.target.name] = e.target.value;

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == 'success') {
      alert(
        'Your message has been successfully sent. I will contact you as soon as possible!',
      );
      nameEl.value = '';
      emailEl.value = '';
      textEl.value = '';
      checkboxEl.checked = false;
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
      alert('Your message has not been sent! Please, try later!');
    }
  };
  xhr.send(JSON.stringify(formData));
});

function initForm() {
  // Receiving data from localStorage
  let persistedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedData) {
    persistedData = JSON.parse(persistedData);
    // If there is data, DOM is reloading
    Object.entries(persistedData).forEach(([name, value]) => {
      formData[name] = value;
      contactFormEl.elements[name].value = value;
    });
  }
}

//For scrolling up
const upEl = document.querySelector('.scroll-up');

//Scrolling up

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 1600) {
    upEl.classList.add('animate__animated', 'animate__fadeIn');
    upEl.classList.remove('animate__fadeOut');
  } else {
    upEl.classList.add('animate__fadeOut');
    upEl.classList.remove('animate__fadeIn');
  }
});

//For init wow.js lib
new WOW().init();
