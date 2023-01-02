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
    const section = [...document.querySelectorAll('.category-title')];
    const sections = {};

    section.forEach(item => {
      sections[item.id] = item.offsetTop;
    });

    for (const [key, val] of Object.entries(sections)) {
      if (val <= window.scrollY + 200) {
        const active = document.querySelector('a.active');
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

  const resizeGridItem = item => {
    const grid = item.parentElement;
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const contentHeight = item.querySelector('dl').getBoundingClientRect().height + rowGap;
    const rowSpan = Math.ceil(contentHeight / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  };

  const resizeAllGridItems = () => {
    const allItems = [...document.querySelectorAll('.achievement-wrapper')];
    allItems.forEach(item => resizeGridItem(item));
  };

  window.addEventListener('scroll', activeAnchor);
  window.addEventListener('resize', activeAnchor);
  window.addEventListener('resize', resizeAllGridItems);

  resizeAllGridItems();

  const achievements = [...document.querySelectorAll('.achievement-wrapper')];
  achievements.forEach(item => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const title = entry.target.querySelector('.achievement-title').innerHTML;
        if (entry.isIntersecting) {
          entry.target.classList.remove('tilt');
        } else {
          entry.target.classList.add('tilt');
        }
      });
    }, options);
    observer.observe(item);
  });

  const sideBarOpenBtn = document.querySelector('.filter-list-item-side-toggle-btn');
  sideBarOpenBtn.addEventListener('click', e => {
    sideBar.classList.add('open');
  });

  const sideBarCloseBtn = document.querySelector('.side-bar-close-btn');
  sideBarCloseBtn.addEventListener('click', e => {
    sideBar.classList.remove('open');
  });

  const sideBarDark = document.querySelector('.side-bar-dark');
  sideBarDark.addEventListener('click', e => {
    sideBar.classList.remove('open');
  });

  const mediaSize992 = window.matchMedia('(min-width: 992px)');
  mediaSize992.addEventListener('change', e => {
    if (e.matches) {
      sideBar.classList.remove('open');
    }
  });

  const themeSwitch = document.querySelector('#theme-switch');
  const themeSwitcherIcon = document.querySelector('.theme-switcher-icon');
  themeSwitch.checked = localStorage.getItem('switchedTheme') === 'true';
  themeSwitcherIcon.classList = themeSwitch.checked
    ? 'bx bxs-sun theme-switcher-icon'
    : 'bx bxs-moon theme-switcher-icon';

  themeSwitch.addEventListener('change', e => {
    if (e.currentTarget.checked === true) {
      themeSwitcherIcon.classList = 'bx bxs-sun theme-switcher-icon';
      localStorage.setItem('switchedTheme', 'true');
    } else {
      themeSwitcherIcon.classList = 'bx bxs-moon theme-switcher-icon';
      localStorage.removeItem('switchedTheme');
    }
  });
}
App();

if (module.hot) {
  module.hot.accept();
}
