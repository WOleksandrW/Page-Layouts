import Select from './classes/Select.js';

export default function script() {
  const selects = document.querySelectorAll('.select');

  selects.forEach((select) => {
    const display = select.querySelector('.select__display');
    const list = select.querySelector('.select__list');

    if (!display || !list) return;

    const selectObj = new Select(select);
    selectObj.init();
    
    for (let i = 1; i <= 5; i++) {
      selectObj.addOption(i, i);
    }
  });
}
