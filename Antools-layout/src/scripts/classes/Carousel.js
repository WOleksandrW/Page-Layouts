export default class Carousel {
  list = null;
  pagination = null;

  constructor(list, pagination) {
    this.list = list;
    this.pagination = pagination;
  }

  init() {
    this.arrayItems = Array.from(this.list.children);
    
    const sum = this.arrayItems.reduce((acc, item) => acc + item.offsetWidth, 0);
    const sizeElem = sum / this.arrayItems.length;
    const gap = (this.list.offsetWidth - sum) / (this.arrayItems.length - 1);
    this.pace = sizeElem + gap;

    this.arraySteps = Array.from(this.pagination.children);
    this.arraySteps.forEach((step, stepIdx) => {
      step.addEventListener('click', () => this.moveTo(stepIdx));
    });

    this.currentIdx = 0;
  }

  moveTo(idx) {
    this.list.style.transform = `translate(-${this.pace * idx}px, 0)`;
    this.arraySteps.forEach((step, stepIdx) => step.classList.toggle('active', idx === stepIdx));
    this.currentIdx = idx;
  }

  moveLeft() {
    this.moveTo(Math.max(this.currentIdx - 1, 0));
  }

  moveRight() {
    this.moveTo(Math.min(this.currentIdx + 1, this.arrayItems.length - 1));
  }
}
