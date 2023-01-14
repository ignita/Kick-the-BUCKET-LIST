import Api from '../utils/http';
import CategoriesPannel from '../components/stats/CategoriesPannel';
import YearsPannel from '../components/stats/YearsPannel';
export default class StatsView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.getData();
  }

  async getData() {
    const { data: categories = [] } = await Api.get(`/api/stats/categories`);
    const { data: yearsTrending = [] } = await Api.get(`/api/stats/years`);
    this.setState({ categories, yearsTrending });
  }

  render() {
    this.container.innerHTML = '';
    const main = document.createElement('main');
    main.classList.add('stats-wrapper');
    this.container.append(main);

    const categoriesTitle = document.createElement('h1');
    categoriesTitle.innerText = '카테고리별 비율';
    main.append(categoriesTitle);
    new CategoriesPannel({ parent: main, props: this.state.categories });

    const yearsTitle = document.createElement('h1');
    yearsTitle.innerText = '달성 항목 추이';
    main.append(yearsTitle);
    new YearsPannel({ parent: main, props: this.state.yearsTrending });
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }
}
