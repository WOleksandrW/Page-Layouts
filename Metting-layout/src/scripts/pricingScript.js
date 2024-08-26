import priceList from '../data/priceList.js';

const values = ['monthly', 'annualy'];

export default function script() {
  const input = document.querySelector('#price-type-switch');
  if (!input) return;

  const items = Array.from(document.querySelectorAll('.price-item[data-type]'))
    .map((el) => ({
      el,
      type: el.dataset.type,
      textEl: el.querySelector('.js-price-value')
    }));

  input.addEventListener('change', (e) => {
    items.forEach((item) => {
      if (!item.textEl) return;

      const data = priceList[item.type][values[Number(e.target.checked)]];
      item.textEl.innerHTML = `$${data.price}<span class="price-item__termin">${data.subText}</span>`;
    });
  });

}
