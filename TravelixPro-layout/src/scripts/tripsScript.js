import trips from '../data/trips.js';
import CarouselWithPagination from './classes/CarouselWithPagination.js';
import generateRating from './utils/generateRating.js';

export default function script() {
  const tripsCarousel = document.querySelector('#trips-carousel');
  if (!tripsCarousel) return;

  const list = tripsCarousel.querySelector('.carousel__list');
  if (!list) return;

  const addClasses = {};
  if (list.dataset.theme === 'secondary') {
    addClasses.btn = 'btn--secondary';
  }

  const cards = trips.map((trip) => generateTripCard(trip, addClasses));
  list.innerHTML = '';
  list.append(...cards);

  const carousel = new CarouselWithPagination(tripsCarousel);
  carousel.activate();
}

function generateTripCard(data, addClasses) {
  const card = document.createElement('li');
  card.className = 'trip-item';

  const description = data.description.slice(0, 60) + '...';

  const btn = document.createElement('button');
  btn.className = addClasses.btn ? `btn + ${addClasses.btn}` : 'btn';
  btn.textContent = 'View Details';
  btn.addEventListener('click', () => console.log(data.title));

  const rating = generateRating(data.rating, 'large');

  const imgBlock = `<div class="trip-item__img-block">
    <img class="trip-item__image" src="${data.image}" alt="${data.title}">
  </div>`;
  const head = `<div class="trip-item__head">
    <h4 class="h4 text-color1 trip-item__title">${data.title}</h4>
    <h4 class="h4 accent-secondary1">${data.price}$</h4>
  </div>`;
  const text = `<p class="text1">${description}</p>`;
  const reviews = `<div class="trip-item__reviews">
    ${rating.outerHTML}
    <p class="text2 text-color3">${(data.reviews / 1000).toFixed(2)}k Review</p>
  </div>`;
  const btnBlock = `<div class="trip-item__btn-block">
    ${btn.outerHTML}
  </div>`;

  card.innerHTML = imgBlock + head + text + reviews + btnBlock;

  return card;
}
