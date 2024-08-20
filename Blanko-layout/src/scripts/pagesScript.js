import landingPages from '../data/landingPages.js';
import otherPages from '../data/otherPages.js';

export default function script() {
  const landingList = document.querySelector('#landing-pages-list');
  const otherList = document.querySelector('#other-pages-list');

  const count = 3;

  if (landingList) {
    setTimeout(() => initList(landingList, landingPages, count), 1000);
  }
  
  if (otherList) {
    setTimeout(() => initList(otherList, otherPages, count), 2000);
  }
}

function addCards(list, arr) {
  list.append(...arr.map((data) => generatePageCard(data)));
}

function initList(list, arr, count) {
  const btnDelay = 2000;
  let i = 0;

  list.innerHTML = '';
  addCards(list, arr.slice(count * i, count * (i + 1)));

  if (!arr[count * (i + 1)]) return;

  const { btnBlock, btn } = initBtn(btnDelay);
  list.parentNode.append(btnBlock);
  btn.addEventListener('click', () => {
    setTimeout(() => {
      i++;
      addCards(list, arr.slice(count * i, count * (i + 1)));
      if (!arr[count * (i + 1)]) list.parentNode.removeChild(btnBlock);
    }, btnDelay);
  });
}

function initBtn(delay) {
  const btnBlock = document.createElement('div');
  btnBlock.className = 'pages-section__btn-block';

  const loaderBlock = document.createElement('div');
  loaderBlock.className = 'pages-section__btn-block__loader';
  loaderBlock.innerHTML = '<div class="loader loader--small"></div>';

  const btn = document.createElement('button');
  btn.className = 'btn btn--primary btn--ellipse';
  btn.textContent = 'Show more';
  btn.addEventListener('click', () => {
    loaderBlock.classList.add('active');
    btn.disabled = true;
    setTimeout(() => {
      loaderBlock.classList.remove('active');
      btn.disabled = false;
    }, delay);
  });

  btnBlock.append(btn, loaderBlock);

  return { btnBlock, btn };
}

function generatePageCard(data) {
  const li = document.createElement('li');
  li.className = 'page-card';

  const imgBlock = `<div class="page-card__img-block">
    <img class="page-card__img" src="${data.image}" alt="${data.title} image">
  </div>`;
  const content = `<div class="page-card__content">
    <h6 class="p1">${data.title}</h6>
  </div>`;

  li.innerHTML = imgBlock + content;
  return li;
}
