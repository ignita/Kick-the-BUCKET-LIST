export default class View {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
    this.handleEvents();
  }

  template() {
    return ``;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  }

  render() {
    this.container.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  handleEvents() {}
}
