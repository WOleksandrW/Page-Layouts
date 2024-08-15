import brands from '../data/brands.js';
import Carousel from './classes/Carousel.js';

function script() {
  const carouselEl = document.querySelector('#brands-carousel');
  if (!carouselEl) return;

  const list = carouselEl.querySelector('.carousel__list');
  if (!list) return;

  list.innerHTML = brands.reduce((acc, data) => acc + generateBrandItem(data), '');

  const carousel = new Carousel(carouselEl);
  carousel.init();
  
  const btnLeft = carouselEl.querySelector('.js-carousel-btn-left');
  const btnRight = carouselEl.querySelector('.js-carousel-btn-right');

  btnLeft?.addEventListener('click', () => {
    carousel.moveLeft(1);
  });
  btnRight?.addEventListener('click', () => {
    carousel.moveRight(1);
  });
}

function generateBrandItem(data) {
  return `<li class="brand-item"><img src="${data.image}" alt="${data.title}"></li>`;
}

export default script;
