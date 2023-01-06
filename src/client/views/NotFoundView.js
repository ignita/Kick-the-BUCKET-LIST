export default class NotFoundView {
  constructor({ container }) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = '404 Not Found';
  }
}
