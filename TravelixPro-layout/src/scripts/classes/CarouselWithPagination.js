import Carousel from './Carousel.js';

export default class CarouselWithPagination extends Carousel {
  pagination = [];

  init() {
    super.init();

    const pagination = this.element.querySelector('.carousel__pagination');

    if (!pagination) return;

    pagination.innerHTML = '';
    for (let i = 0; i < this.pagesCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel__pagination__step';
      btn.addEventListener('click', () => {
        this.moveTo(i);
      });
      this.pagination.push(btn);
      pagination.append(btn);
    }
  }

  updateState() {
    super.updateState();

    if (this.pagination.length > 0) {
      this.pagination.forEach((btn, idx) => {
        btn.classList.toggle('active-step', this.currPage === idx);
      });
    }
  }
}
