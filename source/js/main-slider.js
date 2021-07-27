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
