export default class Carousel {
  el = null;
  currIdx = -1;
  pace = 0;
  transDuration = 300;

  constructor(el) {
    this.el = el;
  }

  init(array, idx) {
    this.array = array
    this.el.innerHTML = '';
    this.el.append(...this.array);

    const sum = this.array.reduce((acc, item) => acc + item.offsetWidth, 0);
    const sizeElem = sum / this.array.length;
    const gap = (this.el.offsetWidth - sum) / (this.array.length - 1);
    this.pace = sizeElem + gap;

    this.currIdx = idx;
    this.update();
  }

  update() {
    this.el.style.transition = `${this.transDuration / 1000}s`;
    this.el.style.transform = `translate(${-(this.pace * (this.currIdx - 1))}px)`;

    this.array.forEach((item, idx) => item.classList.toggle('central', idx === this.currIdx));
  }

  move(direction) {
    this.currIdx += direction;
    this.update();

    setTimeout(() => {
      if (direction < 0) {
        this.array.unshift(this.array.pop());
        this.el.prepend(this.array[0]);
      } else {
        this.array.push(this.array.shift());
        this.el.append(this.array[this.array.length - 1]);
      }
      this.currIdx -= direction;
      this.el.style.transition = 'none';
      this.el.style.transform = `translate(${-(this.pace * (this.currIdx - 1))}px)`;
    }, this.transDuration);
  }

  moveLeft() {
    this.move(-1);
    this.update();
  }

  moveRight() {
    this.move(1);
    this.update();
  }
}
