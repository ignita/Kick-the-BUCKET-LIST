import Api from '../utils/http';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';
import Backdrop from '../components/Backdrop';
import Achievements from '../components/achievements';
import Loader from '../components/Loader';
export default class HomeView {
  constructor({ container }) {
    this.container = container;
    this.state = {
      categories: [],
      achievements: [],
      trending: {},
      filterType: 0,
      loading: true,
      sidebarCollapse: false,
    };

    this.render();
    this.getData();
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

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    new Loader({ container: this.container, initState: this.state.loading });
    new Sidebar({
      container: this.container,
      initState: { categories: this.state.categories, sidebarCollapse: this.state.sidebarCollapse },
    });
    new Backdrop({ container: this.container });
    new SubHeader({ container: this.container, initState: this.state.filterType, setState: this.setState.bind(this) });
    new Achievements({ container: this.container, initState: this.state });
  }
}
