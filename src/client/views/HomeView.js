import View from '../core/View';
import Api from '../utils/http';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';
import Backdrop from '../components/Backdrop';
import Achievements from '../components/achievements';
import Loader from '../components/Loader';
export default class HomeView extends View {
  constructor({ container }) {
    super({
      container,
      initState: {
        categories: [],
        achievements: [],
        trending: {},
        filterType: 0,
        loading: true,
        sidebarCollapse: false,
      },
    });

    this.getData();
  }

  template() {
    return `
      <div class="loader"></div>
      <aside class="side-bar"></aside>
      <div class="side-bar-backdrop"></div>
      <section class="sub-header"></section>
      <main class="achievements-wrapper"></main>
    `;
  }

  async getData() {
    const { data: categories = [] } = await Api.get(`/api/categories`);
    const { data: achievements = [] } = await Api.get(`/api/achievements`);
    const { data: trending = {} } = await Api.get(`/api/stats/trending`);

    this.setState({
      categories,
      achievements,
      trending,
      loading: false,
    });
  }

  mounted() {
    const { loading, categories, sidebarCollapse, filterType } = this.state;

    const loader = document.querySelector('.loader');
    new Loader({ container: loader, props: loading });

    const sidebar = document.querySelector('.side-bar');
    new Sidebar({
      container: sidebar,
      props: { categories, sidebarCollapse },
    });

    const backdrop = document.querySelector('.side-bar-backdrop');
    new Backdrop({ container: backdrop });

    const subHeader = document.querySelector('.sub-header');
    new SubHeader({
      container: subHeader,
      props: filterType,
      setState: this.setState.bind(this),
    });

    const achievementsWrapper = document.querySelector('.achievements-wrapper');
    new Achievements({ container: achievementsWrapper, props: this.state });
  }
}
