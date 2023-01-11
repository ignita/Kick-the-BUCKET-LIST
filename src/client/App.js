import './styles/reset.css';
import './styles/style.css';
import './styles/global.css';

import Header from './components/Header';
import HomeView from './views/HomeView';
import StatsView from './views/StatsView';
import AboutView from './views/AboutView';
import NotFoundView from './views/NotFoundView';

const routes = [
  {
    name: 'Home',
    path: '/',
    view: HomeView,
  },
  {
    name: 'Stats',
    path: '/stats',
    view: StatsView,
  },
  {
    name: 'About',
    path: '/about',
    view: AboutView,
  },
];

function App($app) {
  const contents = document.createElement('div');
  contents.className = 'contents';
  $app.appendChild(contents);

  this.renderView = (path = window.location.pathname) => {
    const container = document.querySelector('.contents');
    const View = routes.find(route => route.path === path)?.view || NotFoundView;
    new View({ container });
  };

  this.handleEvents = () => {
    window.addEventListener('popstate', e => {
      this.renderView();
    });

    const resizeGridItem = item => {
      const grid = item.parentElement;
      const allCards = [...grid.querySelectorAll('.front')];
      const minHeight = Math.min(...allCards.map(card => card.getBoundingClientRect().height));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const contentHeight = item.querySelector('.front').getBoundingClientRect().height + rowGap;
      const rowSpan = Math.ceil(contentHeight / (minHeight + rowGap));
      item.style.gridRowEnd = 'span ' + rowSpan;
    };

    const resizeAllGridItems = () => {
      const allItems = [...document.querySelectorAll('.achievement-wrapper')];
      allItems.forEach(item => resizeGridItem(item));
    };

    window.addEventListener('resize', resizeAllGridItems);
  };

  new Header({ container: $app, initState: routes, renderView: this.renderView });

  this.renderView();
  this.handleEvents();
}

new App(document.querySelector('#app'));

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
