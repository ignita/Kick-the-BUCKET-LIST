import { CATEGORY_COLORS } from '../../constants/colors';
export default class DonutChartDetail {
  constructor({ parent, props }) {
    this.target = document.createElement('ul');
    this.target.className = 'donut-chart-detail';

    parent.appendChild(this.target);

    this.props = props;

    this.render();
  }

  render() {
    this.target.innerHTML = `
    ${this.props
      .map(
        ({ title, cnt, subCategoryId }) =>
          `<li style="border-color: ${CATEGORY_COLORS[subCategoryId]}"> <em>${title}</em> <span>${cnt}</span></li>`,
      )
      .join('')}
    `;
  }
}
