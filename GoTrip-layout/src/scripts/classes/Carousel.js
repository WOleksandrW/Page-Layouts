export default class Carousel {
  transDuration = 300;
  canMove = false;

  constructor(list) {
    this.list = list;
  }

  init(idx) {
    this.array = Array.from(this.list.children);

    const sum = this.array.reduce((acc, item) => acc + item.offsetWidth, 0);
    const sizeElem = sum / this.array.length;
    const gap = (this.list.offsetWidth - sum) / (this.array.length - 1);
    this.pace = sizeElem + gap;
    
    this.currIdx = idx;
    this.canMove = true;
    this.update();
  }

  update() {
    this.list.style.transition = `${this.transDuration / 1000}s`;
    this.list.style.transform = `translate(${-(this.pace * (this.currIdx - 1))}px)`;

    this.array.forEach((item, idx) => item.classList.toggle('active', idx === this.currIdx));
  }

  move() {
    if (this.canMove) {
      this.canMove = false;
      this.currIdx += 1;
      this.update();
  
      setTimeout(() => {
        this.array.push(this.array.shift());
        this.list.append(this.array[this.array.length - 1]);
        this.currIdx -= 1;
        this.list.style.transition = 'none';
        this.list.style.transform = `translate(${-(this.pace * (this.currIdx - 1))}px)`;
        this.canMove = true;
      }, this.transDuration);
    }
  }
}
