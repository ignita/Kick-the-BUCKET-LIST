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
  this.renderView = (path = window.location.pathname) => {
    const container = $app;
    const View = routes.find(route => route.path === path)?.view || NotFoundView;
    new View({ container });
  };

  this.handleEvents = () => {
    window.addEventListener('popstate', () => {
      this.renderView();
    });
  };

  new Header({ container: $app, initState: routes, renderView: this.renderView });

  this.renderView();
  this.handleEvents();
}

new App(document.querySelector('#app'));
