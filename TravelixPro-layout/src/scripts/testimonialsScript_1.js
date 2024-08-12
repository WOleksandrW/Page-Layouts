import testimonials from '../data/testimonials_1.js';
import Carousel from './classes/Carousel.js';
import generateRating from './utils/generateRating.js';

export default function script() {
  const testimonialsCarousel = document.querySelector('#testimonials-carousel');
  if (!testimonialsCarousel) return;

  const list = testimonialsCarousel.querySelector('.carousel__list');
  if (!list) return;

  const items = testimonials.map((testimonial) => generateTestimonialItem(testimonial));
  list.innerHTML = '';
  list.append(...items);

  const carousel = new Carousel(testimonialsCarousel);
  carousel.activate();
}

function generateTestimonialItem(data) {
  const testimonialItem = document.createElement('li');
  testimonialItem.className = 'testimonial';

  const ratingList = generateRating(data.rating);

  const imgBlock = `<div class="testimonial__img-block">
    <img class="testimonial__image" src="${data.image}" alt="${data.authorName}">
  </div>`;
  const content = `<div class="testimonial__content">
    <q class="text1">${data.testimonial}</q>
    <div class="testimonial__info">
      <h5 class="text1 accent-primary3">${data.authorName}</h5>
      <p class="text2">${data.authorJob}</p>
      ${ratingList.outerHTML}
    </div>
  </div>`;

  testimonialItem.innerHTML = imgBlock + content;

  return testimonialItem;
}
