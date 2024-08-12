export default class Select {
  select = null;
  display = null;
  list = null;
  isVisible = false;
  value = '';

  constructor(select) {
    this.select = select
  }

  init() {
    this.display = this.select.querySelector('.select__display');
    this.list = this.select.querySelector('.select__list');

    this.display?.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      this.updateState();
    });

    document.addEventListener('click', (e) => {
      if (!this.select.contains(e.target)) {
        this.isVisible = false;
        this.updateState();
      }
    });
  }

  updateState() {
    this.select.classList.toggle('active', this.isVisible);
  }

  addOption(value, text) {
    const option = document.createElement('li');
    option.className = 'select__item';
    option.textContent = text;
    option.addEventListener('click', () => {
      this.changeValue(value);
    });
    this.list.append(option);
  }

  changeValue(value) {
    this.value = value;
    this.display.innerHTML = value;
    this.isVisible = false;
    this.updateState();
  }
}
