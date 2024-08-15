export default class Carousel {
  items = [];
  duration = 0.3;

  constructor(element) {
    this.element = element;
  }

  init(duration) {
    this.list = this.element.querySelector('.carousel__list');
    if (!this.list) return;

    if (duration) this.duration = duration;

    this.items = Array.from(this.list.children);
    const sum = this.items.reduce((acc, el) => acc + el.offsetWidth, 0);
    this.gap = (this.list.offsetWidth - sum) / (this.items.length - 1);
  }

  moveLeft(value) {
    const cutItems = this.items.splice(0, value);
    const pace = cutItems.reduce((acc, item) => acc + item.offsetWidth + this.gap, 0);

    this.list.style.transition = `transform ${this.duration}s ease`;
    this.list.style.transform = `translate(-${pace}px, 0)`;

    setTimeout(() => {
      this.list.append(...cutItems);
      this.items.push(...cutItems);
      this.list.style.transition = null;
      this.list.style.transform = null;
    }, this.duration * 1000);
  }

  moveRight(value) {
    const cutItems = this.items.splice(-value, value);
    const pace = cutItems.reduce((acc, item) => acc + item.offsetWidth + this.gap, 0);

    this.list.style.transition = `transform ${this.duration}s ease`;
    this.list.style.transform = `translate(${pace}px, 0)`;

    setTimeout(() => {
      this.items.unshift(...cutItems);
      this.list.prepend(...cutItems);
      this.list.style.transition = null;
      this.list.style.transform = null;
    }, this.duration * 1000);
  }
}
