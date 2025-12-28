new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive Breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1, // Show 1 card on small screens
    },
    768: {
      slidesPerView: 2, // Show 2 cards on tablets
    },
    1024: {
      slidesPerView: 3, // Show 3 cards on desktops
    },
  },
});
