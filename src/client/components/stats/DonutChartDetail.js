import { CATEGORY_COLORS } from '../../constants/colors';
import Component from '../../core/Component';
export default class DonutChartDetail extends Component {
  template() {
    return `
    ${this.props
      .map(
        ({ title, cnt, subCategoryId }) =>
          `<li style="border-color: ${CATEGORY_COLORS[subCategoryId]}"> <em>${title}</em> <span>${cnt}</span></li>`,
      )
      .join('')}
    `;
  }
}
