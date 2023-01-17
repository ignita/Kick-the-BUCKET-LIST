import Api from '../utils/http';
import CategoriesPannel from '../components/stats/CategoriesPannel';
import YearsPannel from '../components/stats/YearsPannel';
import View from '../core/View';
export default class StatsView extends View {
  constructor({ container }) {
    super({ container, initState: { categories: [], yearsTrending: [] } });

    this.getData();
  }

  template() {
    return `
      <main class="stats-wrapper">
        <h1>카테고리별 비율</h1>
        <div class="stats-categories-pannel"></div>
        <h1>달성 항목 추이</h1>
        <div class="stats-years-pannel"></div>
      </main>
    `;
  }

  async getData() {
    const { data: categories = [] } = await Api.get(`/api/stats/categories`);
    const { data: yearsTrending = [] } = await Api.get(`/api/stats/years`);
    this.setState({ categories, yearsTrending });
  }

  mounted() {
    const statsCategoriesPannel = document.querySelector('.stats-categories-pannel');
    new CategoriesPannel({ container: statsCategoriesPannel, props: this.state.categories });

    const statsYearsPannel = document.querySelector('.stats-years-pannel');
    new YearsPannel({ container: statsYearsPannel, props: this.state.yearsTrending });
  }
}
