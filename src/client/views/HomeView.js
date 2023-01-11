import Api from '../utils/http';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';
import Backdrop from '../components/Backdrop';
import Achievements from '../components/achievements';
export default class HomeView {
  constructor({ container }) {
    this.container = container;
    this.state = { categories: [], achievements: [], trending: {}, filterType: 0, loading: true };

    this.getData();
  }

  async getData() {
    const { data: categories = [] } = await Api.get(`/api/categories`);
    const { data: achievements = [] } = await Api.get(`/api/achievements`);
    const { data: trending = {} } = await Api.get(`/api/stats/trending`);

    this.setData({
      categories,
      achievements,
      trending,
    });
  }

  setData(data) {
    this.state = {
      ...this.state,
      ...data,
    };

    this.render();
  }

  filterData = ({ filterType }) => {
    this.setData({ filterType });
  };

  render() {
    this.container.innerHTML = '';
    new Sidebar({ container: this.container, initState: this.state.categories });
    new Backdrop({ container: this.container });
    new SubHeader({ container: this.container, initState: this.state.filterType, onFilter: this.filterData });
    new Achievements({ container: this.container, initState: this.state });
  }
}
