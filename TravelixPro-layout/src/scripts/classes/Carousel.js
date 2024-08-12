export default class Carousel {
  element = null;
  list = null;
  btnLeft = null;
  btnRight = null;
  pace = 0;
  pagesCount = 0;
  currPage = 0;

  constructor(element) {
    this.element = element;
  }

  activate() {
    try {
      this.init();
      this.updateState();
    } catch (error) {
      console.log(error);
    }
  }

  init() {
    const wrapper = this.element.querySelector('.carousel__wrapper');
    this.list = this.element.querySelector('.carousel__list');

    if (!wrapper) throw new Error('Can`t find wrapper');
    if (!this.list) throw new Error('Can`t find list');

    const items = Array.from(this.list.children);
    const itemsWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0)
    const gap = (this.list.offsetWidth - itemsWidth) / (items.length - 1);
    this.pace = wrapper.offsetWidth + gap;
    this.pagesCount = Math.ceil(this.list.offsetWidth / this.pace);

    this.btnLeft = this.element.querySelector('.js-carousel-btn-left');
    this.btnRight = this.element.querySelector('.js-carousel-btn-right');
    this.btnLeft?.addEventListener('click', () => {
      this.moveTo(Math.max(this.currPage - 1, 0));
    });
    this.btnRight?.addEventListener('click', () => {
      this.moveTo(Math.min(this.currPage + 1, this.pagesCount - 1));
    });
  }

  moveTo(page) {
    this.currPage = page;
    this.updateState();
  }

  updateState() {
    if (this.list)
      this.list.style.transform = `translate( -${this.currPage * this.pace}px, 0)`

    if (this.btnLeft)
      this.currPage <= 0 ? this.btnLeft.setAttribute('disabled', true) : this.btnLeft.removeAttribute('disabled');

    if (this.btnRight)
      this.currPage >= (this.pagesCount - 1) ? this.btnRight.setAttribute('disabled', true) : this.btnRight.removeAttribute('disabled');
  }
}
