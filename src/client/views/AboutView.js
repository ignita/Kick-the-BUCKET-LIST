export default class AboutView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const main = document.createElement('main');
    main.classList.add('content');
    main.innerHTML = 'About';

    this.container.append(main);
  }
}
