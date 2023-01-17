export default class Component {
  constructor({ container, props }) {
    this.container = container;
    this.props = props;

    this.render();
    this.handleEvents();
  }

  template() {
    return ``;
  }

  render() {
    this.container.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  handleEvents() {}
}
