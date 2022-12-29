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

  function resizeGridItem(item) {
    const grid = item.parentElement;
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const contentHeight = item.querySelector('dl').getBoundingClientRect().height + rowGap;
    const rowSpan = Math.ceil(contentHeight / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  function resizeAllGridItems() {
    const allItems = [...document.querySelectorAll('.achievement-wrapper')];
    allItems.forEach(item => resizeGridItem(item));
  }

  resizeAllGridItems();
  window.addEventListener('resize', resizeAllGridItems);
}

App();

if (module.hot) {
  module.hot.accept();
}
