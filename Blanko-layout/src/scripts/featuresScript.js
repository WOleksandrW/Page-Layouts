import posters from '../data/posters.js';

export default function script() {
  const posterEl = document.querySelector('#feature-poster');
  if (!posterEl) return;

  const pagination = posterEl.querySelector('.poster__pagination');
  if (!pagination) return;

  let isAnother = false;
  let isChanging = false;
  const duration = 1;
  posterEl.style.setProperty('--duration', `${duration}s`);

  const img = posterEl.querySelector('.poster__img');
  const updateImg = (data) => {
    img?.setAttribute('src', data.image);
    img?.setAttribute('alt', data.authorName);
  };

  const posterText = posterEl.querySelector('.poster__text');
  const posterAuthorName = posterEl.querySelector('.js-poster-author-name');
  const posterAuthorJob = posterEl.querySelector('.js-poster-author-job');
  const updateContent = (data) => {
    if (posterText) posterText.textContent = data.text;
    if (posterAuthorName) posterAuthorName.textContent = data.authorName;
    if (posterAuthorJob) posterAuthorJob.textContent = data.authorJob;
  };

  const btns = posters.map((data, idx) => {
    const btn = document.createElement('button');
    btn.className = 'poster__pagination__step';
    if (idx === 0) btn.classList.add('active');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('active') || isChanging) return;

      isChanging = true;
      posterEl.classList.add('changing');
      posterEl.classList.toggle('another', !isAnother);
      isAnother = !isAnother;
      const data = posters[idx];

      setTimeout(() => {
        btns.forEach((jbtn, jidx) => {
          jbtn.classList.toggle('active', idx === jidx)
        });
        updateContent(data);
      }, (duration / 3) * 1000);

      setTimeout(() => {
        updateImg(data);
      }, (duration / 2) * 1000);

      setTimeout(() => {
        posterEl.classList.remove('changing');
        isChanging = false;
      }, duration * 1000);
    });

    return btn;
  });

  pagination.innerHTML = '';
  pagination.append(...btns);
}
