import Carousel from './classes/Carousel.js';

export default function script() {
  const testimonialsList = document.querySelector('#testimonials-list');
  const testimonialsPagination = document.querySelector('#testimonials-pagination');
  const btnLeft = document.querySelector('#testimonials-carousel-left');
  const btnRight = document.querySelector('#testimonials-carousel-right');

  if (!testimonialsList || !testimonialsPagination) return;

  const carousel = new Carousel(testimonialsList, testimonialsPagination);
  carousel.init();

  btnLeft?.addEventListener('click', () => {
    carousel.moveLeft();
  });
  btnRight?.addEventListener('click', () => {
    carousel.moveRight();
  });
}
