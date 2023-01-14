import DonutChart from './DonutChart';
import DonutChartDetail from './DonutChartDetail';

export default class CategoriesPannel {
  constructor({ parent, props }) {
    this.target = document.createElement('div');
    this.target.className = 'stats-categories-pannel';
    this.props = props;

    parent.appendChild(this.target);

    this.render();
  }

  render() {
    const { total, completed, incompleted } = this.props;
    const totalChart = document.createElement('div');
    totalChart.className = 'stats-categories-chart-wrapper';
    totalChart.innerHTML = '<h2 class="donut-chart-title">전체항목</h2>';
    new DonutChart({ parent: totalChart, props: total });
    new DonutChartDetail({ parent: totalChart, props: total });
    this.target.appendChild(totalChart);

    const completedChart = document.createElement('div');
    completedChart.className = 'stats-categories-chart-wrapper';
    completedChart.innerHTML = '<h2 class="donut-chart-title">달성 항목</h2>';
    new DonutChart({ parent: completedChart, props: completed });
    new DonutChartDetail({ parent: completedChart, props: completed });
    this.target.appendChild(completedChart);

    const incompletedChart = document.createElement('div');
    incompletedChart.className = 'stats-categories-chart-wrapper';
    incompletedChart.innerHTML = '<h2 class="donut-chart-title">미달성 항목</h2>';
    new DonutChart({ parent: incompletedChart, props: incompleted });
    new DonutChartDetail({ parent: incompletedChart, props: incompleted });
    this.target.appendChild(incompletedChart);
  }
}
