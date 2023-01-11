export default class StatsView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    this.container.innerHTML = '';
    const main = document.createElement('main');
    main.classList.add('content');
    main.innerHTML = 'Stats';

    this.container.append(main);
  }
}
