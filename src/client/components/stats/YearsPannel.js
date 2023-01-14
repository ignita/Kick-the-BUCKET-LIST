import LineChart from './LineChart';

export default class YearsPannel {
  constructor({ parent, props }) {
    this.target = document.createElement('div');
    this.target.className = 'stats-years-pannel';

    this.props = props;

    parent.appendChild(this.target);

    this.render();
  }

  render() {
    const yearsTrending = this.props;
    new LineChart({ parent: this.target, props: yearsTrending });
  }
}
