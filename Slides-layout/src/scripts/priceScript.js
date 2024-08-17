import priceList from '../data/priceList.js';

const switchValues = ['monthly', 'annual'];

export default function script() {
  const section = document.querySelector('#price-section');
  if (!section) return;

  const switchInput = section.querySelector('.js-price-switch');
  if (!switchInput) return;

  const priceItems = Array.from(section.querySelectorAll('.price-item'))
    .filter((item) => Object.keys(priceList).includes(item.dataset.type))
    .map((elem) => ({
      type: elem.dataset.type,
      elem: elem,
      rateValueEl: elem.querySelector('.price-item__rate__value'),
      rateEl: elem.querySelector('.price-item__rate'),
      rateDescEl: elem.querySelector('.js-rate-desc'),
      btn: elem.querySelector('.js-buy-btn')
    }));

  priceItems.forEach((item) => {
    item.btn?.addEventListener('click', () => {
      const text = `Add to cart - ${item.type} ${switchValues[Number(switchInput.checked)]}`;
      console.log(text);
      alert(text);
    });
  });

  switchInput.addEventListener('change', (e) => {
    priceItems.forEach((item) => updateState(item, switchValues[Number(switchInput.checked)]));
  })
}

function updateState(item, value) {
  if (!item.rateEl || !item.rateValueEl || !item.rateDescEl) return;

  const data = priceList[item.type][value];

  item.rateValueEl.textContent = data.value;
  item.rateDescEl.textContent = data.descText;
  item.rateEl.innerHTML = item.rateValueEl.outerHTML + data.subText;
}
