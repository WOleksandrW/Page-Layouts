import benefits from '../data/benefits.js';

function script() {
  const textEl = document.querySelector('#benefit-decription');
  const btns = Array.from(document.querySelectorAll('.benefit-btn'));

  if (!textEl) return;

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active-benefit')) return;

      btns.forEach((el) => {
        el.classList.toggle('active-benefit', el === btn);
      });
      new Promise((res, rej) => {
        textEl.classList.add('blured');
        setTimeout(() => res(), 150);
      }).then(() => {
        textEl.innerHTML = (benefits[btn.dataset.id] ?? [])
          .reduce((acc, text) => acc + `<span>${text}</span>`, '');
        textEl.classList.remove('blured');
      });
    });
  });
}

export default script;
