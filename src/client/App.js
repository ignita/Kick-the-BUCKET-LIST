// import test from './test';

import './styles/reset.css';
import './styles/style.css';
import './styles/global.css';
import 'boxicons';

function App() {
  const sideBar = document.querySelector('.side-bar');
  const sideBarHeaderBtn = document.querySelector('.side-bar-header-btn');
  const sideBarHeaderBtnIcon = document.querySelector('.side-bar-header-btn-icon');

  sideBarHeaderBtn.addEventListener('click', e => {
    sideBar.classList.toggle('collapse');

    if (sideBar.classList.contains('collapse')) {
      sideBarHeaderBtnIcon.classList = 'bx bx-arrow-from-left side-bar-header-btn-icon';
    } else {
      sideBarHeaderBtnIcon.classList = 'bx bx-arrow-from-right side-bar-header-btn-icon';
    }
  });

  const activeAnchor = () => {
    const section = [...document.querySelectorAll('.card-list')];
    const sections = {};

    section.forEach(item => {
      sections[item.id] = item.offsetTop;
    });

    console.log({ scroll: window.scrollY, trip: sections['trip'] });

    for (const [key, val] of Object.entries(sections)) {
      if (val <= window.scrollY + 200) {
        const active = document.querySelector('.active');
        if (active) {
          document.querySelector('.active').classList.remove('active');
        }

        const anchor = document.querySelector('a[href*=' + key + ']');
        if (anchor) {
          anchor.classList.add('active');
        }
      }
    }
  };

  window.addEventListener('scroll', activeAnchor);
  window.addEventListener('resize', activeAnchor);
}

App();

if (module.hot) {
  module.hot.accept();
}
