// import './styles/reset.css';
// import './styles/style.css';
// import './styles/global.css';
// import 'boxicons';
// import './assets/test_image.svg';

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

  const changeNav = entries => {
    entries.forEach(entry => {
      const { isIntersecting, intersectionRatio, target } = entry;
      const { id } = target;
      const anchor = document.querySelector('a[href*=' + id + ']');
      if (isIntersecting && intersectionRatio >= 0.55) {
        if (anchor) {
          anchor.classList.add('active');
        }
      } else {
        if (anchor) {
          anchor.classList.remove('active');
        }
      }
    });
  };

  const navObserver = new IntersectionObserver(changeNav, {
    threshold: 0.8,
  });
  const sections = document.querySelectorAll('.category-title');
  sections.forEach(section => navObserver.observe(section));

  const resizeGridItem = item => {
    const grid = item.parentElement;
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const contentHeight = item.querySelector('.front').getBoundingClientRect().height + rowGap;
    const rowSpan = Math.ceil(contentHeight / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  };

  const resizeAllGridItems = () => {
    const allItems = [...document.querySelectorAll('.achievement-wrapper')];
    allItems.forEach(item => resizeGridItem(item));
  };

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
    e.preventDefault();
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

  const storageKey = 'theme-preference';
  const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
      return localStorage.getItem(storageKey);
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  };
  const theme = { value: getColorPreference() };

  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  };

  const reflectPreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value);
    document.querySelector('#theme-switcher')?.setAttribute('aria-label', theme.value);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    metaThemeColor.content = theme.value === 'dark' ? '#3d4852' : '#293c8b';
  };

  reflectPreference();
  document.querySelector('#theme-switcher').addEventListener('click', e => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';

    setPreference();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });

  const achievementsContent = document.querySelector('.achievements-content');
  achievementsContent.addEventListener('click', e => {
    if (!e.target.closest('.achievement-wrapper')) {
      const flippedCards = [...document.querySelectorAll('.flipped')];
      flippedCards.forEach(item => item.classList.remove('flipped'));
      return;
    }

    const card = e.target.closest('.achievement-wrapper');
    card.classList.toggle('flipped');
  });

  achievementsContent.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      const card = document.querySelector('.achievement-wrapper:focus');
      card.classList.toggle('flipped');
    }
  });
}
App();

if (module.hot) {
  module.hot.accept();
}
