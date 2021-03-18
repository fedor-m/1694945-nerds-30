/*Объявление переменных*/
const buttonOpen = document.querySelector(".button-mail");
const switchers = document.querySelectorAll(".advantage-switcher");
const slides = document.querySelectorAll(".advantage-item");
const modal = document.querySelector(".modal");
const form = modal.querySelector(".modal-form");
const buttonClose = modal.querySelector(".modal-close");
let isStorageSupport = true;
let storage = {};
let name = form.querySelector(".modal-input.name");
let email = form.querySelector(".modal-input.email");
let letter = form.querySelector(".modal-textarea.letter");
/*Переключение слайдов*/
function switch_slides(switcher, slide) {
  switcher.addEventListener("click", function () {
    let chosenButton = document.querySelector(".advantage-switcher.chosen");
    let chosenSlide = document.querySelector(".advantage-item.chosen");
    chosenButton.classList.remove("chosen");
    chosenSlide.classList.remove("chosen");
    this.classList.add("chosen");
    slide.classList.add("chosen");
  });
}
for (let i = 0; i < switchers.length; i++) {
  switch_slides(switchers[i], slides[i]);
}
/*Проверка поддержки локального хранилища*/
try {
  storage.name = !localStorage.getItem("form_name") ? "" : localStorage.getItem("form_name");
  storage.email = !localStorage.getItem("form_email") ? "" : localStorage.getItem("form_email");
  storage.letter = !localStorage.getItem("form_letter") ? "" : localStorage.getItem("form_letter");
} catch (err) {
  isStorageSupport = false;
}
/*Действия по нажатию кнопок открытия-закрытия модального окна*/
buttonOpen.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.add("opened");
  if (storage) {
    name.value = storage.name;
    email.value = storage.email;
    letter.value = storage.letter;
  } else {
    name.focus();
  }
});
buttonClose.addEventListener("click", function () {
  modal.classList.remove("opened");
  modal.classList.remove("error");
});
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27 && modal.classList.contains("show")) {
    modal.classList.remove("opened");
    modal.classList.remove("opened");
  }
});
/*Действия по нажатию кнопки «Отправить»*/
form.addEventListener("submit", function (e) {
  if (!name.value.trim() || !email.value.trim() || !letter.value.trim()) {
    e.preventDefault();
    modal.classList.remove("error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("error");
    const inputs = modal.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value.trim() || !inputs[i].checkValidity()) {
        inputs[i].classList.add("invalid");
      }
      else
        inputs[i].classList.remove("invalid");
    }
    if (!letter.value.trim() || !letter.checkValidity())
      letter.classList.add("invalid");
    else
      letter.classList.remove("invalid");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("form_name", name.value);
      localStorage.setItem("form_email", email.value);
      localStorage.setItem("form_letter", letter.value);
    }
  }
})
