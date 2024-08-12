import Carousel from './classes/Carousel.js';

export default function script() {
  const list = document.querySelector('#destination-list');
  const btn = document.querySelector('#move-destination-list');

  if (!list) return;

  const carousel = new Carousel(list);
  carousel.init(1);

  btn?.addEventListener('click', () => {
    carousel.move();
  });
}
