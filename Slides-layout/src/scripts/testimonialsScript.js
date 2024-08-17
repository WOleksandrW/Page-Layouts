import testimonials from '../data/testimonials.js';
import Carousel from './classes/Carousel.js';

export default function script() {
  const carouselEl = document.querySelector('#testimonials-carousel');
  if (!carouselEl) return;

  const list = carouselEl.querySelector('.carousel__list');
  if (!list) return;

  const items = testimonials.map((data) => generateTestimonial(data));
  list.innerHTML = '';
  list.append(...items);

  const carousel = new Carousel(carouselEl);
  carousel.init(2);
}

function generateTestimonial(data) {
  const testimonial = document.createElement('li');
  testimonial.className = 'testimonial';

  const text = data.text
    .replace(data.accentPart, `<span class="accent-marker">${data.accentPart}</span>`);

  const textBlock = `<p class="testimonial__text">${text}</p>`;
  const authorBlock = `<div class="testimonial__author">
    <img class="testimonial__author__avatar" src="${data.authorImg}" alt="${data.authorName}" >
    <p class="p2">${data.authorName}</p>
  </div>`;

  testimonial.innerHTML = textBlock + authorBlock;

  return testimonial;
}
