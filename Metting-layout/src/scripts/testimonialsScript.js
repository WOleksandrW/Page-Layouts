import testimonials from '../data/testimonials.js';

export default function testimonialsScript() {
  const circle = document.querySelector('#users-circle');
  if (!circle) return;

  const outer = circle.querySelector('.users-circle__outer');
  const inner = circle.querySelector('.users-circle__inner');
  if (!outer || !inner) return;

  let isCanMove = true;

  const outerImgs = Array.from(outer.querySelectorAll('.users-circle__img'));
  const innerImgs = Array.from(inner.querySelectorAll('.users-circle__img'));

  outerImgs.forEach((img, idx) => {
    const step = 360 / outerImgs.length;

    img.addEventListener('click', () => {
      if (!isCanMove) return;
      circle.classList.remove('alt-pos');
      setRotateData(outer, outerImgs, step * idx);
      setRotateData(inner, innerImgs, null);
    });
  });

  innerImgs.forEach((img, idx) => {
    const step = 360 / outerImgs.length;

    img.addEventListener('click', () => {
      if (!isCanMove) return;
      circle.classList.add('alt-pos');
      setRotateData(inner, innerImgs, step * idx);
      setRotateData(outer, outerImgs, null);
    });
  });

  const testimonialEl = document.querySelector('#testimonial');
  if (!testimonialEl) return;

  const textEl = testimonialEl.querySelector('.testimonial__text');
  const authorName = testimonialEl.querySelector('.testimonial__author__name');
  const authorJob = testimonialEl.querySelector('.testimonial__author__job');
  let activeIdx = 0;

  [...outerImgs, ...innerImgs].forEach((img, idx) => {
    img.addEventListener('click', () => {
      if (activeIdx === idx) return;

      isCanMove = false;
      const data = testimonials[idx];
      testimonialEl.classList.add('blur');

      setTimeout(() => {
        if (textEl && data.text) textEl.textContent = data.text;
        if (authorName && data.authorName) authorName.textContent = data.authorName;
        if (authorJob && data.authroJob) authorJob.textContent = data.authroJob;
        testimonialEl.classList.remove('blur');

        isCanMove = true;
        activeIdx = idx;
      }, 150);
    });
  });
}

function setRotateData(circle, imgs, value) {
  if (value === null) {
    circle.style.transform = value;
    imgs.forEach((img) => {
      img.style.transform = value;
    });
  } else {
    circle.style.transform = `translate(-50%, -50%) rotate(-${value}deg)`;
    imgs.forEach((img) => {
      img.style.transform = `translate(-50%, -50%) rotate(${value}deg)`;
    });
  }
}
