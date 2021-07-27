const descriptions = document.querySelectorAll(".advantages__description");
const buttons = document.querySelectorAll(".advantages__button");

const clearCurrentAdv = () => {
  descriptions.forEach(description => {
    if (description.classList.contains("advantages__description--current"))
    description.classList.remove("advantages__description--current");
  });
}

const addCurrentAdv = (param) => {
  descriptions.forEach(description => {
    if (description.dataset.type === param)
    description.classList.add("advantages__description--current");
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
      clearCurrentAdv();
      addCurrentAdv(button.dataset.type);
  });
});

let links = document.querySelectorAll(".check__link");
let forms = document.querySelectorAll(".form");
let items = document.querySelectorAll(".check__item");

const clearCurrent = () => {
  forms.forEach(form => {
    if (form.classList.contains("form--current"))
    form.classList.remove("form--current");
  });

  links.forEach(link => {
    if (link.classList.contains("check__link--current"))
    link.classList.remove("check__link--current");
  });
}

const addCurrent = (param) => {
  forms.forEach(form => {
    if (form.dataset.type === param) {
    form.classList.add("form--current");
    };
  });

  links.forEach(link => {
    if (link.dataset.type === param)
    link.classList.add("check__link--current");
  });
}

links.forEach(link => {
  link.addEventListener("click", () => {
    clearCurrent();
    addCurrent(link.dataset.type);
  });
});

new Swiper(".news__swiper", {
  navigation: {
    nextEl: '.swiper--next',
    prevEl: '.swiper--prev',
  },
  pagination: {
    el: '.swiper-pag',
    clickable: true,
  },
  slidesPerView: "auto",
  spaceBetween: 40,
});
