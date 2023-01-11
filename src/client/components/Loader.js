export default class Loader {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'loader';
    this.target.innerHTML = `<div class="spinner"></div>`;
    this.container.appendChild(this.target);

    this.state = initState;

    this.render();
  }

  render() {
    this.target.classList.toggle('show', this.state);

    this.target.classList;
  }
}
