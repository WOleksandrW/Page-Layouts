export default function script() {
  const header = document.querySelector('.header');
  if (!header) return;

  const nav = header.querySelector('.header__nav');
  if (!nav) return;

  const navBtn = nav.querySelector('.header__nav__btn');
  const btnMenu = header.querySelector('.header__btn');

  const overlay = document.querySelector('.overlay');

  const turnOn = () => {
    btnMenu?.classList.add('active-menu');
    nav.classList.add('active-menu');
    document.querySelector('body')?.classList.add('disable');
    overlay?.classList.add('active');
  };
  const turnOff = () => {
    btnMenu?.classList.remove('active-menu');
    nav.classList.remove('active-menu');
    document.querySelector('body')?.classList.remove('disable');
    overlay?.classList.remove('active');
  };

  btnMenu?.addEventListener('click', turnOn);

  navBtn?.addEventListener('click', turnOff);

  overlay?.addEventListener('click', turnOff);
}
