import testimonials from '../data/testimonialsData.js';
import Carousel from './classes/Carousel.js';

function script() {
  const userList = document.querySelector('#users-list');
  const testimonialList = document.querySelector('#testimonials-list');
  const btnLeft = document.querySelector('#userl-control-left');
  const btnRight = document.querySelector('#userl-control-right');
  
  if (!userList || !testimonialList) return;

  const userCarousel = new Carousel(userList);
  userCarousel.init(testimonials.map((data) => createUser(data)), 2);
  
  const testimonialCarousel = new Carousel(testimonialList);
  testimonialCarousel.init(testimonials.map((data) => createTestimonial(data)), 2);

  btnLeft?.addEventListener('click', () => {
    userCarousel.moveLeft();
    testimonialCarousel.moveLeft();
  });
  btnRight?.addEventListener('click', () => {
    userCarousel.moveRight();
    testimonialCarousel.moveRight();
  });
}

function createUser(data) {
  const user = document.createElement('li');
  user.className = 'user';

  const image = document.createElement('img');
  image.className = 'user__image';
  image.setAttribute('src', data.image);
  image.setAttribute('alt', 'user');

  user.append(image);

  return user;
}

function createTestimonial(data) {
  const testimonial = document.createElement('li');
  testimonial.className = 'testimonial';
  
  const text = document.createElement('p');
  text.className = 'testimonial__text';
  text.textContent = data.testimonial;
  
  const authorName = document.createElement('h4');
  authorName.className = 'testimonial__author-name';
  authorName.textContent = data.authorName;
  
  const authorPosition = document.createElement('p');
  authorPosition.className = 'testimonial__author-position';
  authorPosition.textContent = data.authorPosition;

  testimonial.append(text, authorName, authorPosition);

  return testimonial;
}

export default script;
