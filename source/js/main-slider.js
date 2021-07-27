new Swiper(".news__swiper", {
  navigation: {
    nextEl: '.swiper--next',
    prevEl: '.swiper--prev',
  },
  pagination: {
    el: '.swiper-pag',
    clickable: true,
  },
  breakpoints: {
    360: {
    slidesPerView: 1,
    },
    978: {
      slidesPerView: 3,
      }
  },
  spaceBetween: 40,
  loop: true,
});
