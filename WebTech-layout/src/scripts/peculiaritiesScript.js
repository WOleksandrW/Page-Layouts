import peculiarities from '../data/peculiaritiesData.js';

function generatePeculiarities() {
  const list = document.querySelector('#peculiarities-list');

  if (list) {
    list.innerHTML = '';
    list.append(...peculiarities.map((data) => createPeculiarity(data)));
  }
}

function createPeculiarity(data) {
  const peculiarity = document.createElement('li');
  peculiarity.className = 'peculiarity';

  const image = document.createElement('img');
  image.className = 'peculiarity__img';
  image.setAttribute('src', data.image);
  image.setAttribute('alt', 'icon');

  const details = document.createElement('div');
  details.className = 'peculiarity__details';

  const title = document.createElement('h3');
  title.className = 'peculiarity__title';
  title.textContent = data.title;

  const text = document.createElement('p');
  text.className = 'peculiarity__text';
  text.textContent = data.text;

  details.append(title, text);
  peculiarity.append(image, details);

  return peculiarity;
}

export default generatePeculiarities;
