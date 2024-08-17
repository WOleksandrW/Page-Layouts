export default class Carousel {
  list = null;
  items = [];
  canMove = false;
  activeIdx = -1;
  duration = 0.3;

  constructor(element) {
    this.element = element;
  }

  init(activeIdx) {
    this.list = this.element.querySelector('.carousel__list');
    if (!this.list) return;

    this.items = Array.from(this.list.children);
    this.pace = this.items[0].offsetWidth;

    this.leftBtn = this.element.querySelector('.js-carousel-btn-left');
    this.rightBtn = this.element.querySelector('.js-carousel-btn-right');

    this.leftBtn?.addEventListener('click', () => {
      this.moveLeft(1);
    });
    this.rightBtn?.addEventListener('click', () => {
      this.moveRight(1);
    });

    this.canMove = true;
    this.activeIdx = activeIdx;
    this.updateState();
  }

  updateState(shift) {
    this.list.style.transform = 
      `translate(${(-this.pace * this.activeIdx) + (shift ?? 0)}px, 0)`;
  }

  moveLeft(value) {
    if (!this.canMove) return;

    const cutItems = this.items.splice(0, value);

    this.list.style.transition = `transform ${this.duration}s ease`;
    this.updateState(-this.pace * value);

    setTimeout(() => {
      this.list.style.transition = null;
      this.updateState();
      this.items.push(...cutItems);
      this.list.append(...cutItems);
      this.canMove = true;
    }, this.duration * 1000);
  }

  moveRight(value) {
    if (!this.canMove) return;

    const cutItems = this.items.splice(-value, value);

    this.list.style.transition = `transform ${this.duration}s ease`;
    this.updateState(this.pace * value);

    setTimeout(() => {
      this.list.style.transition = null;
      this.updateState();
      this.items.unshift(...cutItems);
      this.list.prepend(...cutItems);
      this.canMove = true;
    }, this.duration * 1000);
  }
}
