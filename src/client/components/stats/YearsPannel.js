import Component from '../../core/Component';
import LineChart from './LineChart';

export default class YearsPannel extends Component {
  mounted() {
    const yearsTrending = this.props;
    new LineChart({ container: this.container, props: yearsTrending });
  }
}
