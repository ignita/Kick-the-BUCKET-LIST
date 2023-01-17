import Component from '../core/Component';

export default class Loader extends Component {
  template() {
    return `<div class="spinner"></div>`;
  }
  mounted() {
    this.container.classList.toggle('show', this.props);
  }
}
