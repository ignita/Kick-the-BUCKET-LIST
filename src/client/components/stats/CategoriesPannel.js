import Component from '../../core/Component';
import DonutChart from './DonutChart';
import DonutChartDetail from './DonutChartDetail';

const FILTER_TYPE = {
  total: '전체 항목',
  completed: '달성 항목',
  incompleted: '미달성 항목',
};

export default class CategoriesPannel extends Component {
  template() {
    return Object.keys(this.props)
      .map(key => {
        return `<div class="stats-categories-chart-wrapper" data-chart-key="${key}">
                  <h2 class="donut-chart-title">${FILTER_TYPE[key]}</h2>
                  <div class="donut-chart-wrapper"></div>
                  <ul class="donut-chart-detail"></ul>
                </div>`;
      })
      .join('');
  }

  mounted() {
    for (const [key, value] of Object.entries(this.props)) {
      const chart = document.querySelector(
        `.stats-categories-chart-wrapper[data-chart-key="${key}"] .donut-chart-wrapper`,
      );
      new DonutChart({ container: chart, props: value });
      const chartDetail = document.querySelector(
        `.stats-categories-chart-wrapper[data-chart-key="${key}"] .donut-chart-detail`,
      );
      new DonutChartDetail({ container: chartDetail, props: value });
    }
  }
}
