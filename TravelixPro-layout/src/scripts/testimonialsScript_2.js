import testimonials from '../data/testimonials_2.js';
import generateRating from './utils/generateRating.js';

class TestimonialsBlock {
  users = [];
  testimonialText = null;
  authorName = null;
  authorJob = null;
  canChange = true;

  constructor(element) {
    this.element = element;
  }

  init(content) {
    this.users = Array.from(this.element.querySelectorAll('.avatar'))
      .map((avatar, idx) => ({
        avatar,
        position: {
          x: avatar.offsetLeft,
          y: avatar.offsetTop
        },
        ...content[idx]
      }));

    this.users.forEach((user, idx) => {
      if (user.avatar.classList.contains('avatar-placeholder')) {
        user.avatar.classList.remove('avatar-placeholder');
        this.updateState(user);
      }
      user.avatar.addEventListener('click', () => this.activeUser(idx));
    });

    this.starList = this.element.querySelector('.rating-list');
    this.testimonialText = this.element.querySelector('.js-testimonial-text');
    this.authorName = this.element.querySelector('.js-author-name');
    this.authorJob = this.element.querySelector('.js-author-job');
  }

  activeUser(activeIdx) {
    const newUser = this.users[activeIdx];
    if (newUser.avatar.classList.contains('active-avatar')) return;

    const activedUser = this.users.find(({ avatar }) => avatar.classList.contains('active-avatar'));
    if (!activedUser) return;

    if (!this.canChange) return;
    this.canChange = false;

    activedUser.avatar.classList.remove('active-avatar');
    activedUser.position = newUser.position;
    this.updateState(activedUser);
    newUser.avatar.classList.add('active-avatar');
    newUser.position = null;
    this.updateState(newUser);

    this.starList?.classList.add('blurred');
    this.testimonialText?.classList.add('blurred');
    this.authorName?.classList.add('blurred');
    this.authorJob?.classList.add('blurred');

    new Promise((res) => setTimeout(() => res(), 150))
      .then(() => {
        if (this.starList)
          this.starList.innerHTML = generateRating(newUser.rating).innerHTML;
        if (this.testimonialText)
          this.testimonialText.textContent = newUser.testimonial;
        if (this.authorName)
          this.authorName.textContent = newUser.authorName;
        if (this.authorJob)
          this.authorJob.textContent = newUser.authorJob;
      }).then(() => {
        return new Promise((res) => setTimeout(() => res(), 150));
      }).then(() => {
        this.starList?.classList.remove('blurred');
        this.testimonialText?.classList.remove('blurred');
        this.authorName?.classList.remove('blurred');
        this.authorJob?.classList.remove('blurred');
        this.canChange = true;
      });
  }

  updateState(user) {
    user.avatar.style.top = user.position ? `${user.position.y}px` : '';
    user.avatar.style.left = user.position ? `${user.position.x}px` : '';
  }
}

export default function script() {
  const element = document.querySelector('#testimonial-block');
  
  if (!element) return;

  const testimonialsBlock = new TestimonialsBlock(element);
  testimonialsBlock.init(testimonials);
}
